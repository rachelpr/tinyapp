# Tinyapp

This project is for making a URL shortening service similar to TinyURL, Bitly, or Goo.gl. It is created as part of my studies at Lighthouse Labs. It is a fullstack app created using Node and Express.

## Features
- Shortens a URL
- Edit or Delete a URL from the app
- Login/logout as needed

## Dependencies
- Node.js
- Express
- body-parser
- cookie-session
- bcrypt
- EJS

## Final Product


## How To Get Started
1. Install all dependencies using `npm install` command
2. Run the server using `node express_server.js` or `npm start` in your terminal
3. Open `localhost:8080/urls` in your browser
4. Click on "TinyApp" for the register/login page, or register to create an account

## How To Use
1. Login from the login page, for by clicking "TinyApp"
2. Create new short URLS from the "Create New URL" page
3. View URLs you've created on the "My URLS" page
4. URLs can be deleted by clicking the "delete" button on the "My URLs" page
5. URLS can be edited by clicking on the "edit" button on the "My URLs" page, and then submitting the new URL in the Edit section

## Special notes
- Users can only view, edit, or delete URLs they've created
- Users can view the actual URL by click on the short URL hyperlink on /url/:shortURL

