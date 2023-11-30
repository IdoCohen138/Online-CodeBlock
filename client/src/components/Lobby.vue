
<template>
  <div class="lobby">
    <div v-if="showCode">
      <CodeBlock
        :socket="socket"
        :codeBlockName="codeBlockName"
        :initialCode="initialCode"
        :isMentor="isMentor"
        :studentJoin="studentJoin"
      ></CodeBlock>
      <div class="back-button">
        <button @click="handleBack">Back</button>
      </div>
    </div>

    <div v-else>
      <h1 class="title">Please choose code mission:</h1>
      <div class="button-container">
        <button
          v-for="(label, index) in codeBlockOptions"
          :key="index"
          class="modern-button"
          @click="handleCodeBlock(label)"
        >
          {{ label }}
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
  import CodeBlock from "./CodeBlock";
  import io from 'socket.io-client';

  const socketServerUrl = process.env.VUE_APP_SOCKET_SERVER_URL;

  export default {
    data() {
      return {
        socket: null,
        showCode: false,
        codeBlockName: "",
        initialCode: "",
        isMentor: null,
        studentJoin: null,
        codeBlockOptions: [
          "Sum Two Numbers",
          "Fibonacci",
          "Reverse String",
          "Factorial",
        ],
      };
    },
    methods: {
      handleCodeBlock(codeBlockTitle) {
        this.codeBlockName = codeBlockTitle;
        this.showCode = true;
        this.socket.emit("joinCodeBlock", codeBlockTitle);
  
        switch (codeBlockTitle) {
          case "Sum Two Numbers":
            this.initialCode = "/*\n   Write a function that takes a two numbers(x, y) and returns the sum. \n*/ \n\nfunction sumNumbers(x, y) {\n  // Your code here\n}";
            break;
          case "Fibonacci":
            this.initialCode = "/*\n   Write a function that returns the fibonacci value of input n. \n*/ \n\nfunction fibonacci(n) {\n  // Your code here\n}";
            break;
          case "Reverse String":
            this.initialCode = "/*\n   Write a function that takes a string and returns its reverse. \n*/ \n\nfunction reverseString(str) {\n  // Your code here\n}";
            break;
          case "Factorial":
            this.initialCode = "/*\n   Write a function that returns the factorial of input n. \n*/ \n\nfunction factorial(n) {\n  // Your code here\n}";
            break;
        }
      },
      handleBack() {
        if (this.isMentor && this.showCode) {
          this.socket.emit("mentorLeaveRoom", this.socket.id, this.codeBlockName);
        }
        this.showCode = false;
        this.isMentor = false;
        this.codeBlockName = "";
        this.solution = "";
      },
    },
    created() {
      // Initialize the socket connection when the component is created
      this.socket = io(socketServerUrl);
  
      this.socket.on("isMentor", (val) => {
        this.isMentor = val;
      });

      this.socket.on("studentJoin", (flag) => {
        this.studentJoin = true
      });

      // Listen for the mentorLeftRoom event
      this.socket.on("mentorLeftRoom", (codeBlockName) => {
      // Check if the mentor who left is the current mentor in the CodeBlock
      if (codeBlockName === this.codeBlockName) {
        // Hide the CodeBlock component
        this.showCode = false;
        this.isMentor = false;
        this.codeBlockName = "";
        this.solution = "";
      }
      });
    },
    components: {
      CodeBlock,
    },
  };
</script>
  
<style scoped>
.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.modern-button {
  padding: 10px 20px;
  background-color: #3498db;
  color: black; 
  font-size: 16px; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modern-button:hover {
  background-color: #2980b9;
}
</style>
  