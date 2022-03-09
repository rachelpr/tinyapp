const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW"
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
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


app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies["user_id"]],
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = { user: users[req.cookies["user_id"]] }
  if (req.cookies["user_id"]) {
    res.render("urls_new", templateVars);
  } else {
    res.render("urls_login", templateVars);
  }
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    user: users[req.cookies["user_id"]],
  };
  res.render("urls_show", templateVars);
});

app.post("/urls/", (req, res) => {
  if (req.cookies["user_id"]) {
    const shortURL = generateRandomString();
    let longURL = req.body.longURL
    urlDatabase[shortURL] = {
      longURL: longURL,
      userID: req.cookies["user_id"]
    }
    res.redirect(`/urls/${shortURL}`)
    //res.render("urls_new", templateVars);
  } else {
    res.send("Error 400: Not logged in");
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
        password: req.body.password
      }
      res.cookie("user_id", users[userID].userID)
      res.redirect("/urls")
    } else {
      res.statusCode = 400;
      res.send("Error 400: You've already registered!")
    }
  } else {
    res.statusCode = 400;
    res.send("Error: Enter an email and password")
  }
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]
  res.redirect(longURL);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect("/urls");
});

app.post("/urls/:shortURL", (req, res) => {
  const templateVars = { user: users[req.cookies["user_id"]] }
  if (req.cookies["user_id"]) {
    res.render("urls_new", templateVars);
  } else {
    res.render("urls_login", templateVars);
  }

});

app.post("/login", (req, res) => {
  const user = getUserWithEmail(req.body.email)
  if (user) {
    if (req.body.password === user.password) {
      res.cookie("user_id", user.userID)
      res.redirect("/urls")
    } else {
      res.statusCode = 403;
      res.send("Error 403: Incorrect Password")
    }
  } else {
    res.statusCode = 403;
    res.send("Error 403: Email cannot be found")
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/urls");
});

app.get("/register", (req, res) => {
  const templateVars = { user: users[req.cookies["user_id"]] }
  res.render("urls_register", templateVars)
});

app.get("/login", (req, res) => {
  const templateVars = {
    user: users[req.cookies["user_id"]],
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

const getUserWithEmail = function (email) {
  for (let userID in users) {
    if (users[userID].email === email) {
      return users[userID];
    }
  }
  return undefined;
}