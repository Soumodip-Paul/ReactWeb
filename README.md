# JUSC BLOG

THis is a test blogging Applicaton for JUSC .

![IMG](./jusc-logo.png)

This app is build using ReactJS, Node JS with Firebase as an database 

## How to run the project?

1. Clone this repository in your local system.

2. Open the command prompt from your project directory and run the command `npm start`.

3. Go to your browser and type `http://127.0.0.1:3000/` in the address bar.<br/>`or`<br/>You can type
`localhost:3000` in the address bar .

4. Create a `.env` file in your project level  directory.

5. Create a firebase project and then copy the credentials in `.env` file of your root directory like
    <br/>

    ```js
    REACT_APP_API_KEY = firebase_api_key...
    REACT_APP_PROJECT_ID = your_firebase_project_id
    REACT_APP_AUTH_DOMAIN = your_firebase_project_id.firebaseapp.com
    REACT_APP_STORAGE_BUCKET = your_firebase_project_id.appspot.com
    REACT_APP_MESSAGING_SENDER_ID = your_messaging id
    REACT_APP_APP_ID = your_app_id
    REACT_APP_MEASUREMENT_ID = your_measurement_id
    ```

5. Hurray! That's it.

## How to create a firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com "Open firebase Console")

2. Click add new Project.

3. Follow the On screen instructions.<br/>
> Note: You donot need to copy the Firebase SDK file as they are included in this project

4. Here is your credentials inside the  `firebaseConfig` 

```js

const firebaseConfig = {
  apiKey: "firebase_api_key...",
  projectId: "your_firebase_project_id",
  authDomain: "your_firebase_project_id.firebaseapp.com",
  storageBucket: "your_firebase_project_id.appspot.com",
  messagingSenderId: "your_messaging id",
  appId: "your_app_id",
  measurementId: "your_measurement_id"
};

```
> Donot paste the ``"`` or any ``,`` in `.env` file constants.This will create problems

## How to clone this project

***To clone this project***

*   Install git for your Computer<br/>
    Download git from [here](https://git-scm.com/downloads) and install

*   Goto the folder to computer your where you want to clone the project

*   Open `Terminal` (For _Linux_ and _Os X_) or `PowerShell` (for _Windows_)

*   Paste this Command
    ```bash
    git clone https://github.com/Soumodip-Paul/ReactWeb.git
    ```

*   This project is cloned in your device

### ToDo

- [x] - created using react
- [ ] - Add a node backend.
