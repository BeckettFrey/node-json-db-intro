const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("index");
});
router.put("/:id", (res, req) => {
  req.send(user);
});

router.post("/", (req, res) => {
  res.redirect("/login/" + 0);
  res.send(req.params.id);
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send("Get user with id " + req.params.id);
  })
  .put((req, res) => {
    res.send("Update user with id " + req.params.id);
  })
  .delete((req, res) => {
    res.send("Delete user with id " + req.params.id);
  });

module.exports = router;
