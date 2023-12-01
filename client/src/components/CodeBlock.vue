<template>
    <div >
      <div>
        <h1>{{ title }}</h1>
      </div>
      <div>
        <p>{{ isMentor ? "Mentor" : "Student" }}</p>
      </div>
      <div >
        <div v-if="!isMentor">
          <textarea
            rows="25"
            cols="100"
            v-model="code"
            @input="InputChange"
            class="code-textarea"
          ></textarea>
        </div>
        <div v-else ref="codeContainer" class="styleForContainer">
        </div>
      </div>
      <div v-if="solved">
        <p> well done!{{"😊"}}</p>
      </div>
    </div>
</template>
  
<script>
  import 'highlight.js/styles/atom-one-light.css'; 
  import hljs from 'highlight.js';

  
  export default {
    components: {
      Highlight,
    },
    props: {
      socket: Object,
      codeBlockName: String,
      isMentor: Boolean,
      initialCode: String,
      studentJoin: Boolean
    },
    data() {
      return {
        code: this.initialCode,
        mentorCode: this.initialCode,
        title: this.codeBlockName,
        solved: false,
      };
    },
    methods: {
      InputChange() {
        this.socket.emit('changeCode', this.code, this.title);
        if (!this.isMentor) {
        this.$nextTick(() => {
          this.highlightCode();
        });
      }
        if (this.code === this.solution) {
          this.solved = true;
          this.socket.emit('solved', true);
        }
      },  
      highlightCode() {
        const codeContainer = this.$refs.codeContainer;
        if (codeContainer) {
          const codeContent = this.mentorCode ;
          codeContainer.innerHTML = codeContent.replace(/\n/g, '<br>');
          codeContainer.style.whiteSpace = 'pre-wrap'; 
          codeContainer.style.textAlign = 'left';
          codeContainer.style.width = '30%';
          codeContainer.style.margin = '0 auto';
          hljs.highlightBlock(codeContainer);
      }
  },
    },
    created() {
      this.socket.on('presentCodeToMentor', (code) => {
        this.mentorCode = code;
        this.$nextTick(() => {
          this.highlightCode();
          });
      });
      this.socket.on('solved', (val) => {
        this.solved = val;
      });
    },
    updated(){
      this.$nextTick(() => {
          this.highlightCode();
          });
    }
}
</script>
  
<style scoped>
  .code-container {
    display: flex;
    justify-content: center;
    margin: 0 auto; 
  }

  .code-container code {
    text-align: left;
  }

</style>