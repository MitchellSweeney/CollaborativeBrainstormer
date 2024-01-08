const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRouter = require("./routers/authRouter");
const brainstormRouter = require("./routers/brainstormRouter");
const ideaRouter = require("./routers/ideaRouter");
const commentRouter = require("./routers/commentRouter");
const fetchRouter = require("./routers/fetchRouter");
const searchRouter = require("./routers/searchRouter");
const validateSession = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3690;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use("/auth", authRouter);

// Creating, Updating, Deleting requires authentication
app.use("/brainstorm", validateSession, brainstormRouter);
app.use("/idea", validateSession, ideaRouter);
app.use("/comment", validateSession, commentRouter);
// Reading requires no authentication
app.use("/", fetchRouter);
app.use("/search", searchRouter);

/*
Stuff done:
1) sign up, sign in, sign out
2) create session, delete session, get all sessions
3) create idea, delete idea, update idea, get all ideas in a session
4) create comment, delete comment, update comment, get all comments (comments can be made for both a session and an idea)
5) search sessions by topic, date range and minimum votes

Todo: 
- Voting system for sessions and ideas
- get logged in users created sessions, ideas, comments
- update session topic
- insert image/audio/video in idea (?)
- CRUD for knowledge base

*/


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;