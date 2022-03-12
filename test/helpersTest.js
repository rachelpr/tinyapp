const { assert } = require("chai");

const { getUserWithEmail } = require("../helpers");

const testUsers = {
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
describe("getUserWithEmail", function () {
  it("should return a user with a valid email", function () {
    const user = getUserWithEmail("user@example.com", testUsers)
    const expectedID = "userRandomID";
    assert.equal(user["id"], expectedID);
  });
  it("should return undefined with a user not in users database", function () {
    const user = getUserWithEmail("nonUser@example.com", testUsers)
    assert.equal(user, undefined)
  })
});

