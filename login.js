import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBKbe3H4Wjn30ggGotO9iOWRQbGacGU050",
    authDomain: "askhubblogs.firebaseapp.com",
    projectId: "askhubblogs",
    storageBucket: "askhubblogs.appspot.com",
    messagingSenderId: "90322113448",
    appId: "1:90322113448:web:bdffc37356bc464d02039d",
    measurementId: "G-ECVNP3FQPX"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
  

const signInbtn = document.getElementById("signInbtn");
const currentPageName = window.location.pathname.split("/").pop();
const loginwithGooglebtn = document.getElementById("loginwithGooglebtn");

const onLoad = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (currentPageName !== "blogpage.html") {
                window.location.href = "blogpage.html"
            }
            console.log(user)
        } else {

            if (currentPageName !== "login.html" && currentPageName !== "") {
                window.location.href = "login.html"
            }

            console.log("User Is not Logged In!")
        }
    });
}
onLoad()

const signInwithGoogle = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider)
        .then((result) => { })
        .catch((error) => { });
};

const signIn = (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error);

        });

};

signInbtn && signInbtn.addEventListener("click", signIn);
loginwithGooglebtn && loginwithGooglebtn.addEventListener("click", signInwithGoogle);