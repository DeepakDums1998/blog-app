# Personal Blog & Content Management Platform

Beginner-friendly full-stack project:

- **Frontend**: React (CRA) + React Router + plain CSS  
- **Backend (serverless)**: Firebase Functions (v2)  
- **Database**: Firebase Firestore  
- **No authentication** (to keep it simple)

---

## What is Firebase?
Firebase is a set of tools from Google that helps you build apps faster.

In this project we use:
- **Firestore**: database to store blog posts
- **Cloud Functions**: serverless backend API (HTTP endpoints)

---

## What does “serverless” mean?
Serverless does **not** mean “no servers exist”.

It means:
- You **don’t manage servers yourself**
- You **deploy code**, and Firebase runs it for you
- Your backend code runs **only when someone calls it**

So you don’t set up:
- a VPS server
- Nginx
- a Node server running 24/7

Firebase handles that.

---

## What are Firebase Functions?
Firebase Functions are backend code you deploy to Firebase.

In this project, they act like a normal REST API with endpoints like:
- `GET /getPosts`
- `POST /createPost`

They are implemented in:
- `firebase/functions/index.js`

---

## How Firestore stores data
Firestore is a NoSQL database.

Simple idea:
- A **collection** is like a folder (we use `posts`)
- A **document** is like a file (one post)

Each post document contains:
- `title` (string)
- `content` (string)
- `author` (string)
- `createdAt` (timestamp)

---

## Project structure

```
firebase/
  firestore.rules
  firebase.json
  sampleData.json
  functions/
    index.js
    package.json

frontend/
  package.json
  public/
    index.html
  src/
    App.jsx
    api.js
    index.css
    index.js
    main.jsx
    pages/
      Home.jsx
      Post.jsx
      Admin.jsx
```

---

## Backend API (Firebase Functions)
Your React app calls these endpoints using `fetch()`.

Routes (mounted on one Function called `api`):
- `GET    /getPosts`
- `GET    /getPostById?id=POST_ID`
- `POST   /createPost`
- `PUT    /updatePost?id=POST_ID`
- `DELETE /deletePost?id=POST_ID`

In production, URLs look like:
`https://<region>-<projectId>.cloudfunctions.net/api/getPosts`

---

## Firestore rules (learning mode)
File: `firebase/firestore.rules`

These rules allow read/write for everyone:
- Good for learning
- Not safe for real apps

Real apps should use authentication and strict rules.

---

## Run locally (recommended for learning)

### 1) Install Firebase CLI (one time)
If you don’t have it:

```bash
npm install -g firebase-tools
```

### 2) Login + choose a Firebase project

```bash
firebase login
```

Then from the `firebase/` folder:

```bash
firebase use --add
```

### 3) Install backend dependencies

```bash
cd firebase/functions
npm install
```

### 4) Start Firebase emulators (Functions + Firestore)
From the `firebase/` folder:

```bash
cd firebase
firebase emulators:start
```

This starts:
- Firestore Emulator on `localhost:8080`
- Functions Emulator on `localhost:5001`
- Emulator UI (a local dashboard)

### 5) Install frontend dependencies

```bash
cd frontend
npm install
```

### 6) Connect React to the local Functions emulator
Create a file: `frontend/.env`

Put this inside (replace `YOUR_PROJECT_ID` with your Firebase project id):

```bash
REACT_APP_FUNCTIONS_BASE_URL=http://127.0.0.1:5001/YOUR_PROJECT_ID/us-central1/api
```

Now start the React app:

```bash
npm start
```

---

## How React connects to the serverless backend
React calls the backend using `fetch()` inside `frontend/src/api.js`.

Example flow:
- Home page loads
- React calls `GET /getPosts`
- Firebase Function runs (serverless)
- Function reads Firestore
- Function returns JSON
- React renders the posts

---

## Deploy Firebase Functions (production)
From the `firebase/` folder:

```bash
firebase deploy --only functions
```

After deploying, update `frontend/.env` to use the deployed Functions URL if you want your React app to talk to production.

---

## Add sample posts
Beginner options:

1) Use the **Admin page** (`/admin`) to create posts (recommended).
2) Open Firestore in Firebase Console and add documents manually.

Sample post text is provided in:
- `firebase/sampleData.json`


