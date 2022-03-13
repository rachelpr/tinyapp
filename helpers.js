//function to get a user with their email
const getUserWithEmail = function (email, users) {
  for (let userID in users) {
    if (users[userID].email === email) {
      return users[userID];
    }
  }
  return undefined;
}

//function to generate a random string. Used for creating short URLs
const generateRandomString = function () {
  let randomString = "";
  let chars = "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
  let charLength = chars.length;
  for (let i = 0; i < 6; i++) {
    randomString += chars.charAt(Math.random() * charLength);
  }
  return randomString;
};

//function to generate random ID. Used to create user IDs
const generateRandomID = function () {
  let randomID = "";
  let chars = "1234567890";
  let charLength = chars.length;
  for (let i = 0; i < 8; i++) {
    randomID += chars.charAt(Math.random() * charLength);
  }
  return randomID;
};

//function to check if an email exists in the database
const emailExists = function (email, users) {
  for (let user in users) {
    if (users[user].email === email) {
      return true;
    }
  }
  return false;
};

//function to check the urls for a given user
const urlsForUser = function (id, urlDatabase) {
  let userUrls = {};
  for (let shortURL in urlDatabase) {
    if (urlDatabase[shortURL].userID === id) {
      userUrls[shortURL] = urlDatabase[shortURL];
    }
  }
  return userUrls;
};

module.exports = { getUserWithEmail, generateRandomString, generateRandomID, emailExists, urlsForUser };