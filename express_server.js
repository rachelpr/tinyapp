const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");
const getUserWithEmail = require("./helpers")

const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: "session",
  keys: ["aKey"],
}));

app.set("view engine", "ejs");

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW"
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "aJ48lW"
  },
  lpF4g9: {
    longURL: "https://www.cbc.ca",
    userID: "aJ48lW"
  }
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-lifted-truck"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishes-stink"
  }
}

app.get("/redirect", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.session.user_id],
  };
  res.render("redirect", templateVars)
});

app.get("/urls", (req, res) => {
  //if (req.cookies["user_id"]) {
  let id = req.session.user_id
  let userUrls = urlsForUser(id)
  const templateVars = {
    urls: userUrls,
    user: users[id],
  };
  res.render("urls_index", templateVars);
  //} else {
  //res.redirect("/redirect")
  //}
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    user: users[req.session.user_id]
  };
  if (req.session.user_id) {
    res.render("urls_new", templateVars);
  } else {
    res.render("redirect", templateVars);
  }
});

app.get("/urls/:shortURL", (req, res) => {
  let id = req.session.user_id
  let userURLS = urlsForUser(id)
  const templateVars = {
    shortURL: req.params.shortURL,
    urls: userURLS,
    user: users[req.session.user_id],
  };
  //if (req.cookies["user_id"]) {
  res.render("urls_show", templateVars);
  //} else {
  //  res.render("redirect", templateVars);
  //}
});

app.post("/urls", (req, res) => {
  if (req.session.user_id) {
    const shortURL = generateRandomString();
    let longURL = req.body.longURL
    urlDatabase[shortURL] = {
      longURL: longURL,
      userID: req.session.user_id
    }
    res.redirect(`/urls/${shortURL}`)
    //res.render("urls_new", templateVars);
  } else {

    res.status(400).send("Error: Unauthorized request");
  }
  ;
});

app.post("/register", (req, res) => {
  if (req.body.email && req.body.password) {
    if (!emailExists(req.body.email, users)) {
      const userID = generateRandomID();
      users[userID] = {
        userID,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      }
      req.session.user_id = userID
      res.redirect("/urls")
    } else {
      res.status(400).send("Error 400: You've already registered!")
    }
  } else {
    res.status(400).send("Error: Enter an email and password")
  }
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]
  res.redirect(longURL);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  if (req.session.user_id === urlDatabase[shortURL].userID) {
    delete urlDatabase[shortURL];
  } else {
    res.send("You cannot do that")
  }
  res.redirect("/urls");
});

app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  if (req.session.user_id === urlDatabase[shortURL].userID) {
    urlDatabase[shortURL].longURL = req.body.longURLEdit
    res.redirect(`/urls/${shortURL}`)
  } else {
    res.status(401).send("Unauthorized action")
  }
});

app.post("/login", (req, res) => {
  const user = getUserWithEmail(req.body.email)
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user_id = user.userID;
      res.redirect("/urls")
    } else {
      res.status(403).send("Error: Incorrect Password")
    }
  } else {
    res.status(403).send("Error: Email cannot be found")
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.clearCookie("session.sig")
  res.redirect("/urls");
});

app.get("/register", (req, res) => {
  const templateVars = { user: users[req.session.user_id] }
  res.render("urls_register", templateVars)
});

app.get("/login", (req, res) => {
  const templateVars = {
    user: users[req.session.user_id],
  };
  res.render("urls_login", templateVars)
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});

const generateRandomString = function () {
  let randomString = ""
  let chars = "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
  let charLength = chars.length
  for (let i = 0; i < 6; i++) {
    randomString += chars.charAt(Math.random() * charLength);
  }
  return randomString
}

const generateRandomID = function () {
  let randomID = ""
  let chars = "1234567890"
  let charLength = chars.length
  for (let i = 0; i < 8; i++) {
    randomID += chars.charAt(Math.random() * charLength);
  }
  return randomID
}

const emailExists = function (email) {
  for (let user in users) {
    if (users[user].email === email) {
      return true;
    }
  }
  return false;
}

const urlsForUser = function (id) {
  let userUrls = {};
  for (let shortURL in urlDatabase) {
    if (urlDatabase[shortURL].userID === id) {
      userUrls[shortURL] = urlDatabase[shortURL]
    }
  }
  return userUrls;
}