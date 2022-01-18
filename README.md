# M7011E
Project in M7011E Design of Dynamic Web Systems at LTU.

HOW TO RUN PROJECT:
1. USE ssh -p 26345 simpon-7@130.240.207.20 to connect to server. PASSWORD: hejsan12345
2. Go to home\simpon-7\M7011E
3. Install nodejs v14, npm v6 and mongodb
4. RUN "npm install"
5. Start mongodb by "sudo systemctl start mongod" or "sudo service mongodb start" (check status with "sudo service mongodb status" or "sudo systemctl status mongod")
6. RUN "node app.js" to start backend
7. Open new termonal window and go to home\simpon-7\M7011E\frontend
8. RUN "npm install"
9. RUN "npm start" to start frontend.
10. Go to "http://130.240.200.77:3000/" to open project in browser

