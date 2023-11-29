<template>
    <div>
      <h2>Code Editor</h2>
      <codemirror
        v-model="code"
        :options="editorOptions"
        @input="onCodeChange"
      ></codemirror>
    </div>
  </template>
  
  <script>
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/material.css';
  import 'codemirror/mode/javascript/javascript';
  import { codemirror } from 'vue-codemirror';
  import io from 'socket.io-client';
  import hljs from 'highlight.js';
  
  export default {
    components: {
      codemirror,
    },
    data() {
      return {
        code: '',
        editorOptions: {
          tabSize: 2,
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
        },
      };
    },
    computed: {
      highlightedCode() {
        return hljs.highlight('javascript', this.code).value;
      },
    },
    mounted() {
      this.socket = io('http://localhost:3000');
  
      // Listen for code updates from the server
      this.socket.on('codeUpdate', updatedCode => {
        this.code = updatedCode;
      });
    },
    methods: {
      onCodeChange() {
        // Emit code changes to the server
        this.socket.emit('codeUpdate', this.code);
      },
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  