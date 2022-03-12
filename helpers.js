//helper function to get a user with their email
const getUserWithEmail = function (email, users) {
  for (let userID in users) {
    if (users[userID].email === email) {
      return users[userID];
    }
  }
  return undefined;
}


module.exports = { getUserWithEmail };