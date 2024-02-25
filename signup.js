import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
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

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signupbtn = document.getElementById("signupbtn");

const signUp = (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let Confirmpassword = document.getElementById("Confirmpassword").value;

    // Validate password
    if (password !== Confirmpassword) {
        alert("Password and Confrim Password does not match");
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                window.location.href = "login.html";
                console.log(user);
                console.log("Your Account Created has been Successfully!");

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                alert(error);
                // ..
            });
    }
};
signupbtn && signupbtn.addEventListener("click", signUp);