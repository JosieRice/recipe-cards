const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID
};

const devConfig = {
  apiKey: "AIzaSyDBy1oIR-RTdseyC1uXLraVCy893j1T4N8",
  authDomain: "recipecards-1.firebaseapp.com",
  databaseURL: "https://recipecards-1.firebaseio.com",
  projectId: "recipecards-1",
  storageBucket: "recipecards-1.appspot.com",
  messagingSenderId: "870947085364"
};

// const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export { devConfig };
