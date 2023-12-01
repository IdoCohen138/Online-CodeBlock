Online Coding Web Application
Overview
Welcome to the Online Coding Web Application! This project is designed to facilitate remote coding sessions between mentors and students. The application features a lobby page where users can choose from various code blocks and a dedicated code block page for real-time collaborative coding.

Pages and Features
Lobby Page
Title: "Choose code block"
List of at least 4 items representing code blocks
Each item named after a specific code block (e.g., "Async case")
Clicking on an item navigates the user to the corresponding code block page
Code Block Page
Both mentor and student users can access this page.
The first user to open the code block page becomes the mentor; subsequent users are considered students.
Mentor sees the chosen code block in read-only mode.
Student can modify the code, with changes displayed in real-time using Socket.io.
Utilizes Highlight.js (or equivalent) for syntax highlighting (JS code only).
General Guidelines
Code blocks are manually created, with fields 'title' and 'code.'
Clear comments are added to the code where necessary.
Involves client-server-DB architecture, using any framework/language.
Deployment and hosting use a microservices architecture:
Client: Hosted on AWS S3 Link
Server and Database: Hosted on Railway.app
Bonus Feature
Includes a "solution" for each code block.
When the student's code matches the solution, a big smiley face is displayed.
Deployment
The project is deployed using a microservices architecture:

Client Service: Hosted on AWS S3 platform.
AWS S3 Deployment Link
Server and Database: Hosted on Railway.app.
Railway.app Deployment Link
Design Pattern
The project follows a microservices architecture, with services for the client, server, and database. For more details, refer to the project repository on GitHub.

Submission
Deployed App: AWS S3 Deployment Link
GitHub Repository: Link to GitHub Repository
If you have any questions or need further clarification, feel free to contact the HR team at Moveo via email or phone.

Good luck, and happy coding!

Moveo's HR Team
