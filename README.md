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

<img width="1439" alt="Screen Shot of login/register page" src="https://user-images.githubusercontent.com/93479462/158067950-5871d289-b152-4cf4-96a3-af1e7a4aaffd.png">

<img width="1436" alt="Screen Shot 2022-03-12 at 2 58 12 PM" src="https://user-images.githubusercontent.com/93479462/158067903-8bec6d98-c8c6-4a7d-823a-4b5aae7287ca.png">

<img width="1434" alt="Screen Shot 2022-03-12 at 2 58 02 PM" src="https://user-images.githubusercontent.com/93479462/158067907-a63ee9c7-1b2f-4822-ad25-134fd0ef8e60.png">

<img width="1436" alt="Screen Shot 2022-03-12 at 2 57 10 PM" src="https://user-images.githubusercontent.com/93479462/158067916-ef71a83c-173a-4fa1-b55f-87653c06a5c9.png">

<img width="1432" alt="Screen Shot 2022-03-12 at 2 56 59 PM" src="https://user-images.githubusercontent.com/93479462/158067920-90418585-4d04-49e8-9741-93cc55154140.png">

<img width="1433" alt="Screen Shot 2022-03-12 at 2 56 41 PM" src="https://user-images.githubusercontent.com/93479462/158067941-63882220-ef47-4f98-8ad3-fe74949913d9.png">

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
