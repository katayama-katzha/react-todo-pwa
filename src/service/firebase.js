// Firebaseアプリと必要なサービスをインポート
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase設定を使用してアプリを初期化
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  
// アプリを初期化
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'it';
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line
      const token = credential.accessToken;
      // The signed-in user info.
      // eslint-disable-next-line
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // eslint-disable-next-line
      const errorCode = error.code;
      // eslint-disable-next-line
      const errorMessage = error.message;
      // The email of the user's account used.
      // eslint-disable-next-line
      const email = error.customData.email;
      // The AuthCredential type that was used.
      // eslint-disable-next-line
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

const logOut = () => {
    auth.signOut()
    .then(() => {
      console.log("logged out");
      document.location.reload();
    })
    .catch((error) => {
      console.log(error.message);
    });
};



// 必要に応じて、これらのインスタンスをエクスポートして他の部分で使用
export { auth, db ,signInWithGoogle,logOut};
