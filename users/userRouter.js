const express = require('express');
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

// router.post('/', (req, res) => {
//   // do your magic!
//   const user = req.body

//   if(!user.name) {
//     res.status(400).json({errorMessage: "Please provide name."});
//   } else {
//       try {
//           Users.insert(user);
//           res.status(201).json(Users);
//       }
//        catch (err) {
//           res.status(500).json({errorMessage: "There was an error while saving the post to the database."});
//       } 
//   }
// });

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)

  .then(user => {
    if(user){
      res.status(201).json(user);
    } else {
      res.status(500).json({
      error: "There was an error while saving to the database"
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: "There was an error while saving the user to the database."
    });
  })

});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database."
      });


  // const { id } = req.params;
  // const comment = { ...req.body, post_id: id };

  // Users.getById(id)
  //   .then(post => {
  //     if (post.length) {
  //       if (comment.text) {
  //         Posts.insert(comment)
  //           .then(newComment => {
  //             res.status(201).json(newComment);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //             res.status(500).json({
  //               error: "There was an error while saving to the database"
  //             });
  //           });
  //       } else {
  //         res.status(404).json({ message: "Comment is missing." });
  //       }
  //     } else {
  //       res.status(404).json({ message: "The id is not in database" });
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: "There was an error while saving the comment to the database."
  //     });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the users",
    });
  });
});

// router.get('/:id', (req, res) => {
//   // do your magic!
//   Users.getById(req.params.id)
//   .then(user => {
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: "user not found" });
//     }
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: "Error retrieving the user",
//     });
//   });
// });

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user post not found" });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the user",
    });
  });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: "This user has been nuked" });
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the user",
    });
  });
});

router.put('/:id', (req, res) => {
  // do your magic!
  const changes = req.body;
  Users.update(req.params.id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the user",
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the user",
    });
  });
}

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

function validateUser(req, res, next) {
  // do your magic!
  const user = req

  if(user.body) {
    if(user.body.name) {
      next();
    } else {
      res.status(400).json({message: "missing required name field"});
    }
  } else {
    res.status(400).json({errorMessage: "missing user data."});
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body
  
  if(post.text) {
    next()
  } else {
    res.status(400).json({message: "missing post data"});
  }

  // if(user.body) {
  //   if(user.body.text) {
  //     next();
  //   } else {
  //     res.status(400).json({message: "missing post data"});
  //   }
  // } else {
  //   res.status(400).json({errorMessage: "missing required text field."});
  // }

  // const { id } = req.params;
  // const comment = { ...req.body, post_id: id };

  // Users.getById(id)
  //   .then(post => {
  //     if (post.length) {
  //       if (comment.text) {
  //         Posts.insert(comment)
  //           .then(newComment => {
  //             res.status(201).json(newComment);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //             res.status(500).json({
  //               error: "There was an error while saving to the database"
  //             });
  //           });
  //       } else {
  //         res.status(404).json({ message: "Comment is missing." });
  //       }
  //     } else {
  //       res.status(404).json({ message: "The id is not in database" });
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: "There was an error while saving the comment to the database."
  //     });
  //   });
}

module.exports = router;
