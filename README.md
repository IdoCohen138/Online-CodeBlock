# Online Coding Web Application

[Link](http://online-code138.s3-website.eu-north-1.amazonaws.com/)

## Overview

Welcome to the Online Coding Web Application! This project is designed to facilitate remote coding sessions between mentors and students. The application features a lobby page where users can choose from various code blocks and a dedicated code block page for real-time collaborative coding.

## Pages and Features

### Lobby Page

- **Title:** "Choose code block"
- List of 4 items representing code blocks
  - Each item named after a specific code block (e.g., "fibonacci")
  - Clicking on an item navigates the user to the corresponding code block page

### Code Block Page

- Both mentor and student users can access this page.
- The first user to open the code block page becomes the mentor; subsequent user are considered student.
- Mentor sees the chosen code block in read-only mode.
- Student can modify the code, with changes displayed in real-time using Socket.io.
- Utilizes Highlight.js for syntax highlighting - JS code only.

  
## Feature

- DataBase contain a solution for each code block.
- When the student's code matches the solution, a big smiley face is displayed.

## Deployment

The project is deployed using a microservices architecture:

- **Client Service:** Hosted on AWS S3 platform.
  - [AWS S3 Deployment Link](http://online-code138.s3-website.eu-north-1.amazonaws.com/)
- **Server and Database:** Hosted on Railway.app.
  - [Railway.app Deployment Link](https://railway.app/)





