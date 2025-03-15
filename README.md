# Online Code Editor

<p>
This project implements a program for a JS mentor and student.<br />
The program allows the mentor to follow up live on the student in a readonly while the student tackles a task from a given list.<br />
The frontend is implemnted with react and the backend with node.js The real-time follow up is implemented with socket.io and the JS syntax highlighting is done with the codemirror library.<br />
The project runs on a localhost and also deployed to a VPS server (link in the repos 'about')<br />
To run the application localy, clone the repo to your IDE (I used VScode) and delete the package-lock.json files from both the client and server folders. After that run the command 'npm install' in both folders. When that is done, run 'npm run dev' in the serve folder to intialze the server and then run 'npm start' in the client folder to start the client side .
TODO:<br />
1. Implement functionality of submit button to compare student's code to a solution from database.<br />
</p>
