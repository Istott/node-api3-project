const express = require('express');
const morgan = require("morgan");

const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();

// function theGateKeeper(req, res, next) {
//   const seconds = new Date().getSeconds();

//   if (seconds % 3 === 0) {
//     res.status(403).json({ you: "cannot pass!" });
//   } else {
//     next();
//   }
// }


// function requiresAuth(req, res, next) {
//   const { password } = req.headers;

//   if (password) {
//     if (password === "openSaysMe") {
//       next();
//     } else {
//       res.status(401).json({ error: "wrong password!" });
//     }
//   } else {
//     res.status(400).json({ error: "bad request. no password provided!" });
//   }
// }

// server.use(theGateKeeper);
// server.use(requiresAuth);
server.use(morgan("dev"));
server.use(express.json()); // built in middleware

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get('/', (req, res) => {
  res.status(200).json({ 
    environment: process.env.NODE_ENV, 
    port: process.env.PORT,
    greeting: process.env.GREET
});
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

server.use(logger);

module.exports = server;


// const express = require("express"); // importing a CommonJS module
// const morgan = require("morgan");

// const hubsRouter = require("./hubs/hubs-router.js");

// const server = express();

// // the three amigas
// function moodyGateKeeper(req, res, next) {
//   const seconds = new Date().getSeconds();

//   if (seconds % 3 === 0) {
//     res.status(403).json({ you: "cannot pass!" });
//   } else {
//     next();
//   }
// }

// // write a requiresAuth middleware
// // read a password from req.headers
// // if the password is "mellon" let the request continue
// // for any other password return a 401 code with a message
// // if no password is provided in the headers, return a 400 and a message
// function requiresAuth(req, res, next) {
//   const { password } = req.headers;

//   if (password) {
//     if (password === "mellon") {
//       next();
//     } else {
//       res.status(401).json({ error: "wrong password!" });
//     }
//   } else {
//     res.status(400).json({ error: "bad request. no password provided!" });
//   }
// }

// // global middleware
// // server.use(moodyGateKeeper);
// server.use(requiresAuth);
// server.use(morgan("dev"));
// server.use(express.json()); // built in middleware

// server.use("/api/hubs", hubsRouter);

// server.get("/", (req, res) => {
//   const nameInsert = req.name ? ` ${req.name}` : "";

//   res.send(`
//     <h2>Lambda Hubs API</h2>
//     <p>Welcome${nameInsert} to the Lambda Hubs API</p>
//     `);
// });

// module.exports = server;
