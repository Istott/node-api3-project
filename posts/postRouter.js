const express = require('express');
const Posts = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  //   const query = req.query;
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hubs",
      });
    });
});

// router.get('/:id', (req, res) => {
//   // do your magic!
//   Posts.getById(req.params.id)
//   .then(post => {
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: "post not found" });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: "Error retrieving the post",
//     });
//   });
// });

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(404).json({ message: "Middleware says post not found" });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the ",
    });
  });
}

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});


router.delete('/:id', (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been nuked" });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub",
      });
    });

});

router.put('/:id', (req, res) => {
  // do your magic!
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the post",
      });
    });
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
//   Posts.getById(req.params.id)
//   .then(post => {
//     if (post) {
//       req.post = post;
//       next();
//     } else {
//       res.status(404).json({ message: "Middleware says post not found" });
//     }
//   })
//   .catch(error => {
//     // log error to server
//     console.log(error);
//     res.status(500).json({
//       message: "Error retrieving the ",
//     });
//   });
// }

// router.get("/:id", validatePostId, (req, res) => {
//   res.status(200).json(req.post);
// });

module.exports = router;
