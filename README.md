# Top Down Game


**Installing and running the game**

You will need `Node.js` to download and install the `socket.io` and `express` packages the game needs using an npm command.

**To Download Node.js go here:** 

[https://nodejs.org/en/](https://nodejs.org/en/)
Once Node.js is installed open your command prompt and navigate to the directory you cloned this repository to.

**Basic CMD Navigation Tips**

You can use `cd/foldername\foldername\` to find the folder you saved this repository in. If you need to go up a directory you can use `cd..` to go backwards in your file structure.

**Installing `socket.io` and `express`**

Make sure that you are inside of the `top_down_test_game` folder that is defined in this repository. With CMD looking at this directory run the command: `npm install` This will automatically install both `socket.io` and `express` packages using the .json files that are inside the `top_down_test_game` folder.

**How to run the game server**

Now that we have the packages installed, we need to run the `server.js` file located inside the same `top_down_test_game` folder. To do this, use the command: `node server.js`
If all goes well, you should get a message `server starting with ID:  xxxxx`
`Server is now running...Listening on 8081`

This means it is up and running properly! Congratulations! You are now ready to test the game. The server will be listening to connections on port 8081; should you need to, you can change this by editing line 28 of the `server.js` file. Assuming no changes are made, you can now run the game by navigating to http://localhost:8081/ in your internet browser.


## Things to do in order to reach Alpha Version 0.00

 1. **Solve "rubber banding" issue.** 
 Non-local player sprites are currently not updating properly. When a player stops moving, the game will show them continuing to move forwards for a time before snapping them back to the correct position.
 2. **Integrate chat program.** 
Make chat program display on top of the game in the bottom right quadrant of the screen.
 3. **Implement usernames.**
Make it so that users can type in a username and have their player represented by and referenced to as that username in the code.
 4. **Create a character selector**
A scene that runs at the start of the game where the player can scroll through a selection of available sprites and choose one to represent them. We will work on allowing players to customize their sprites in later Alpha versions.

And that's it! With these 4 issues in place we will be able to make the game go live on our website as Alpha Version 0.00!
