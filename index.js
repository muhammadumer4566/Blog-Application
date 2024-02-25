
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKbe3H4Wjn30ggGotO9iOWRQbGacGU050",
  authDomain: "askhubblogs.firebaseapp.com",
  projectId: "askhubblogs",
  storageBucket: "askhubblogs.appspot.com",
  messagingSenderId: "90322113448",
  appId: "1:90322113448:web:bdffc37356bc464d02039d",
  measurementId: "G-ECVNP3FQPX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const logoutBtn = document.getElementById("logoutBtn");
const textTitle = document.getElementById("textTitle");
const type = document.getElementById("type");
const category = document.getElementById("category");
const status = document.getElementById("status");
const description = document.getElementById("description");
const savebtn = document.getElementById("savebtn");
const cancelbtn = document.getElementById("cancelbtn");
const submitBtn = document.getElementById("submitBtn");
const commentTextarea = document.getElementById("comment");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      // User is signed in, get the user's display name
      const userName = user.displayName;
      console.log(user);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }
});

const addblogs = async () => {
  const title = textTitle.value;
  const selectType = type.value;
  const selectCategory = category.value;
  const selectStatus = status.value;
  const desc = description.value;

  // Get current user's name
  const userName = auth.currentUser.displayName;

  // Get current date
  const currentDate = new Date().toLocaleDateString();

  // Check if any field is empty
  if (!title || !selectType || !selectCategory || !selectStatus || !desc) {
    alert("Please fill in all fields to create a blog.");
    return;
  }

  try {
    // Add data to Firestore collection
    const docRef = await addDoc(collection(db, "blogs"), {
      textTitle: title,
      type: selectType,
      category: selectCategory,
      status: selectStatus,
      description: desc,
      userName: userName, // Add current user's name
      date: currentDate, // Add current date
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Your blog has been saved successfully!");
    window.location.href = "index.html";

    // Clear input fields after successful addition
    textTitle.value = "";
    description.value = "";
    type.value = "";
    category.value = "";
    status.value = "";

  } catch (err) {
    console.log(err);
  }
};

// Read Function
const getBlogs = async () => {

  const resRef = collection(db, "blogs");
  const resDocs = await getDocs(resRef);
  const res = resDocs.docs.map((doc) => doc.data());

  displayData(res);
};

// Function to display data on the HTML page

const displayData = (res) => {
  const root = document.getElementById("blog-section");

  res.map((data) => {
    const container = `
    <a href="reviewpage.html?title=${encodeURIComponent(data.textTitle)}&description=${encodeURIComponent(data.description)}&author=${encodeURIComponent(data.userName)}&date=${encodeURIComponent(data.date)}"</a>
    <div class="w-5/6 mx-auto dark:bg-gray-300 dark:text-gray-50 mt-12 rounded-2xl">
    <div class="container grid grid-cols-12 gap-4 mx-auto bg-gray-300 justify-center rounded-2xl">
        <div class="bg-no-repeat bg-cover col-span-12 lg:col-span-4 p-100 rounded-2xl"
            style="background-image: url('pic.png'); background-position: center center; background-size: cover;">
        </div>
        <div class="text-black flex flex-col p-6 col-span-12 row-span-full lg:col-span-8 lg:p-10">
            <div class="flex justify-start">
                <h1 class="text-3xl font-semibold text-black">${data.textTitle}</h1>
            </div>
            <p class="mb-5 font-dark text-black dark:text-black mt-3">
                ${data.description}
                <span id="more" class="hidden">erisque enim ligula venenatis dolor. M aecenas nisl est,
                    ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum a gue ut aliquet.
                    Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In libero s ed nunc
                    venenatis imperdiet ed ornare turpis. Donec vitae dui eget tellus gravidaven ena tis.
                    Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.
                </span>
            </p>
            <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-8 h-8 dark:text-black">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="self-center text-md">${data.userName}</span>
                </div>
                <span class="text-md">${data.date}</span>
            </div>
        </div>
    </div>
    `;
    console.log(data);
    root.innerHTML += container;
  });
};

document.addEventListener("DOMContentLoaded", function () {
  // Read URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  const description = urlParams.get('description');
  const author = urlParams.get('author');
  const date = urlParams.get('date');

  // Populate content with URL parameters
  document.getElementById('blog-title').innerText = title;
  document.getElementById('blog-description').innerText = description;
  document.getElementById('blog-author').innerText = 'Published By: ' + author;
  document.getElementById('blog-date').innerText = 'Date: ' + date;
});

const logout = (e) => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => { });
};

const addComment = async () => {
  const comment = commentTextarea.value.trim();

  if (comment === "") {
    alert("Please enter a comment before submitting.");
    return;
  }

  try {
    const user = auth.currentUser; 
    if (!user) {
      alert("You need to sign in to add a comment.");
      window.location.href = "login.html";
      return;
    }

    const userName = auth.currentUser.displayName;
    const timestamp = new Date(); // Get current time
    const docRef = await addDoc(collection(db, "comments"), {
      userName: userName,
      date: timestamp,
      comment: comment
    });
    console.log("Comment added with ID: ", docRef.id);
    alert("Your comment has been submitted successfully!");

    commentTextarea.value = "";
    // Refresh comments after adding a new comment
    displayComments();
  } catch (err) {
    console.error("Error adding comment: ", err);
  }
}

// Function to fetch comments from Firestore
const fetchComments = async () => {
  const commentsRef = collection(db, "comments");
  const snapshot = await getDocs(commentsRef);
  const comments = snapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
  return comments;
};

// Function to display comments on the HTML page
const displayComments = async () => {
  const comments = await fetchComments();
  const commentsContainer = document.getElementById("comments-container");

  // Clear existing comments
  commentsContainer.innerHTML = "";

  // Loop through each comment and create HTML elements to display them
  comments.forEach(comment => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("bg-gray-100", "p-4", "shadow", "rounded", "mb-4");

    // User information and timestamp
    const userInfo = document.createElement("div");
    userInfo.classList.add("flex", "space-x-6");
    userInfo.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-12 h-12 dark:text-black">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
          </svg>
          <span class="text-md font-semibold">${comment.userName} <br> ${formatTimeAgo(comment.date)}</span>
      `;
    commentDiv.appendChild(userInfo);

    // Comment text
    const commentText = document.createElement("p");
    commentText.classList.add("mt-8", "ml-2");
    commentText.textContent = comment.comment;
    commentDiv.appendChild(commentText);

    // Icon
    const iconImg = document.createElement("img");
    iconImg.classList.add("w-12", "h-12", "mt-6");
    iconImg.src = "icon.png";
    iconImg.alt = "";
    commentDiv.appendChild(iconImg);

    // Append the comment div to the container
    commentsContainer.appendChild(commentDiv);
  });
};

const formatTimeAgo = (timestamp) => {
  // Check if timestamp is defined and is a valid Date object
  const date = timestamp.toDate();
  const now = new Date(); // Current time

  // Calculate the time difference in milliseconds
  const diff = now.getTime() - date.getTime();
  
  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `just now`;
  }
};

document.addEventListener("DOMContentLoaded", displayComments);
logoutBtn && logoutBtn.addEventListener("click", logout);
savebtn && savebtn.addEventListener("click", addblogs);
submitBtn && submitBtn.addEventListener("click", addComment);
document.addEventListener("DOMContentLoaded", getBlogs);

// Select the hamburger button and the menu
const hamburgerButton = document.querySelector(".hamburger-button");
const menu = document.querySelector("#navbar-sticky");

// Function to toggle the menu visibility
function toggleMenu() {
  menu.classList.toggle("hidden");
}
// Event listener for hamburger button click
hamburgerButton && hamburgerButton.addEventListener("click", toggleMenu);