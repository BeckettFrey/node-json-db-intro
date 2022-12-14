const express = require("express");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const { stringify } = require("querystring");
const { runInNewContext } = require("vm");
router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.render("index");
});

// router.post("/", (req, res) => {
//   res.redirect("/login/" + getNumUsers());
//   res.send(req.params.id);
// });
let arrayUsers = [];
let useritems = [[], [], [], [], []];
let name = {};
router
  .route("/:id")
  .get((req, res) => {
    loadItems();

    let theItems = {
      item1: useritems[req.params.id][0],
      item2: useritems[req.params.id][1],
      item3: useritems[req.params.id][2],
      item4: useritems[req.params.id][3],
      item5: useritems[req.params.id][4],
    };
    name = { firstname: arrayUsers[req.params.id], id: req.params.id };
    //const nameJ = JSON.stringify(name);
    //console.log(name);
    res.render("plan0", {
      name,
      theItems,
    });
  })
  .put((req, res) => {
    res.send("Update user with id " + req.params.id);
  })
  .delete((req, res) => {
    res.send("Delete user with id " + req.params.id);
  });
// const users = [{ name: "sally" }, { name: "neil" }];
// Middleware type below uses next to leave function following call and continues.
fs.readFile("./data.json", "utf8", (err, data) => {
  if (err) throw err;
  data = JSON.parse(data);
  for (let i = 0; i < data.length; i++) {
    arrayUsers.push(data[i]);
  }
});

router.post("/:id", (req, res) => {
  const addition = req.body.nitem;
  loadItems();
  //]console.log(req.body.firstname));
  useritems[findIndex(req.body.firstname)].push(addition);
  //console.log(useritems);
  fs.writeFileSync(
    "./useritems.json",
    JSON.stringify(useritems),
    function (err) {
      //console.log(err);
    }
  );
  console.log(req.params.id);
  let theItems = {
    item1: useritems[findIndex(req.body.firstname)][0],
    item2: useritems[findIndex(req.body.firstname)][1],
    item3: useritems[findIndex(req.body.firstname)][2],
    item4: useritems[findIndex(req.body.firstname)][3],
    item5: useritems[findIndex(req.body.firstname)][4],
  };
  // console.log(theItems);

  res.render("plan0", {
    theItems,
    name,
  });
});
router.post("/", (req, res) => {
  const resultsData = req.body.firstname;
  if (userExists(resultsData)) {
    res.redirect("/login/" + findIndex(resultsData));
  } else {
    arrayUsers.push(resultsData);
    fs.writeFileSync("./data.json", JSON.stringify(arrayUsers), function (err) {
      //console.log(err);
    });
    res.redirect("/login/" + findIndex(resultsData));
  }
});
function userExists(user) {
  for (let k = 0; k < getNumUsers(); k++) {
    if (arrayUsers[k] == user) {
      return true;
    }
  }
  return false;
}
function getNumUsers() {
  return arrayUsers.length;
}

function findIndex(user) {
  for (let j = 0; j < getNumUsers(); j++) {
    if (arrayUsers[j] == user) {
      return j;
    }
  }
}
function loadItems() {
  fs.readFile("./useritems.json", "utf8", (err, data) => {
    if (err) throw err;
    //console.log(data);
    data = JSON.parse(data);
    //console.log(data);
    for (let r = 0; r < 5; r++)
      for (let i = 0; i < useritems[r].size; i++) {
        //console.log(useritems[r][i]);
        useritems[r].push(data[r][i]);
      }
  });
}

module.exports = router;
