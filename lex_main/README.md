# LEX

LEX is a web app that list courts and sport games which will automatically match the users to any sport games they want to join so that they do not have to worry about who to play with and where to play.

## Developers
Arya Nagatama Giat & Joseph Nathanael

## Tech Stack
F --- Firebase \
E --- Express \
R --- React \
N --- Node 

## MVP Features
- User login system with Firebase
- Set up their own user (preferences, skill level, etc)
- Display schedule of different sporting events (based on user’s preference) including vacancy & place.
- Allow user to easily arrange a sporting event (can be private or open to - public, up to them)

## Additional Features
- Match making feature (user just press “Find game” and they will be automatically matched to a sports game)
- Competitions/leagues
- Friends / Groups feature
- Allow court owners to publish / post their courts on the app

## Before Using
- Create a `.env.local` file in the root project folder. This file will contain the secret keys for the Firebase configurations.
- Go to [Firebase](https://firebase.google.com) and get your application's keys in `settings` > `your apps` > select `CDN` and get the keys.
- Your `.env.local` file should look like this:
```
REACT_APP_FIREBASE_API_KEY=<apikey>
REACT_APP_FIREBASE_AUTH_DOMAIN=<authDomain>
REACT_APP_FIREBASE_PROJECT_ID=<projectId>
REACT_APP_FIREBASE_STORAGE_BUCKET=<storageBucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<messagingSenderId>
REACT_APP_FIREBASE_APP_ID=<appId>
```
where anything in between and including `<` and `>`  should be substituted with the correct values.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Folder Structure
### `/public`
This is where all the public files should be. \
Public files include `html` files, images, videos, and anything that can be viewed publicly.

### `/src`
This is where all the Javascript, React, Node and other source code files are located.\
Inside the `/src` folder, there are 2 subfolders:
#### - `/components`
React components are located here.
### - `/contexts`
React contexts are located here. The Firebase Authentication context is located in `/contexts/AuthContext.js` and is responsible for setting up Firebase authentication and for any React components within the context to access the context variables and functions such as `login()`, `signup()`, etc...

## Important Files
### `/src/contexts/AuthContext.js`
As mentioned before, this file is responsible for the Firebase authentication context. If you want to add any Firebase related API code, create a new function here and if you want to expose the function to the context, insert the function under the `values` object.
### `/src/components/App.jsx`
This file is the main app of Lex which handles all the routes. If you want to create a new page and want to have a route to that page, Create a `<Route path="/[route]" component={ [ReactComponent] } />` and add it to the `Switch`.
### `/src/firebase.js`
This file is the configuration file for the firebase which contains the API keys, domain, and all the secret keys. These values are from the environment variables stated in `.env.local`.
