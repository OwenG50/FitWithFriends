import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getAuth, setPersistence, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMokGoBtfLIKvYkEJZahCk9Y7ndj4hkjU",
    authDomain: "fitwithfriends-f5632.firebaseapp.com",
    projectId: "fitwithfriends-f5632",
    storageBucket: "fitwithfriends-f5632.appspot.com",
    messagingSenderId: "222521718179",
    appId: "1:222521718179:web:af2f0068bc3166c14f9616",
    measurementId: "G-G5KNNMRV06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

//Variable to store authentication state
let authState = null;
// Redirect users to index page if they are already logged in
onAuthStateChanged(auth, (user) => {
    if (user){
        console.log("User Signed In: ", user);
        authState = user;

        //TODO
        //if page = index.html ---> then go to home.html
        // else do nothing

        setTimeout(function (){
            window.location.href = indexPageUrl;
        }, 1000) //3 seconds

    } else {
        console.log("user is signed out")
        authState = null;
    }

    getCurrentUser();

});

function getCurrentUser(){
    return authState;
    console.log(authState);
}



document.getElementById('reg-btn').addEventListener('click', function() {
    document.getElementById('register-div').style.display='inline';
    document.getElementById('login-div').style.display='none';
});

document.getElementById('log-btn').addEventListener('click', function() {
    document.getElementById('register-div').style.display='none';
    document.getElementById('login-div').style.display='inline';
});

const indexPageUrl = "home.html";

document.getElementById('login-btn').addEventListener('click', function() {
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            document.getElementById('result-box').style.display = 'inline';
            document.getElementById('login-div').style.display = 'none';
            document.getElementById('result').innerHTML = "Welcome Back " + loginEmail;
            console.log(user);
            //GO TO HOME PAGE
            /*
            setTimeout(function (){
                window.location.href = indexPageUrl;
            }, 1000) //1 seconds
            */
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const backButton = document.createElement('button');
            backButton.className = 'back-btn';
            backButton.innerText = 'Back';
            backButton.addEventListener('click', function (){
                document.getElementById('result-box').style.display = 'none';
                if (document.getElementById('login-div').style.display === 'none') {
                    document.getElementById('register-div').style.display = 'inline';
                } else {
                    document.getElementById('login-div').style.display = 'inline';
                }
            })
            document.getElementById('result-box').style.display = 'inline';
            document.getElementById('login-div').style.display = 'none';
            document.getElementById('result').innerHTML = "Sorry! <br>" + errorMessage;
            document.getElementById('result').appendChild(backButton);
        });
    });

    document.getElementById('register-btn').addEventListener('click', function () {

        const registerEmail = document.getElementById("register-email").value;
        const registerPassword = document.getElementById("register-password").value;

        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                document.getElementById('result-box').style.display = 'inline';
                document.getElementById('register-div').style.display = 'none';
                document.getElementById('result').innerHTML = "Welcome " + registerEmail;
                //GO TO HOME PAGE
                /*
                setTimeout(function (){
                    window.location.href = indexPageUrl;
                }, 1000) //1 seconds
                */
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const backButton = document.createElement('button');
                backButton.className = 'back-btn';
                backButton.innerText = 'Back';
                backButton.addEventListener('click', function (){
                    document.getElementById('result-box').style.display = 'none';
                    if (document.getElementById('login-div').style.display === 'none') {
                        document.getElementById('register-div').style.display = 'inline';
                    } else {
                        document.getElementById('login-div').style.display = 'inline';
                    }
                })
                document.getElementById('result-box').style.display = 'inline';
                document.getElementById('register-div').style.display = 'none';
                document.getElementById('result').innerHTML = "Sorry ! <br>"+errorMessage;
                document.getElementById('result').appendChild(backButton);

            });
        });

    document.getElementById('log-out-btn').addEventListener('click', function(){
        signOut(auth).then(() => {
            document.getElementById('result-box').style.display = 'none';
            document.getElementById('login-div').style.display = 'inline';
            // Sign-out successful.
            alert("Signed out");
        }).catch((error) => {
            const errorMessage = error.message;
            // An error happened.
            document.getElementById('result').innerHTML = "Sorry ! <br>"+errorMessage;
        });
    })

export {getCurrentUser};