//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by <William Kan>, Term 2 202?
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme

console.log('%c fb_io.mjs',
    'color: blue; background-color: white;');
var fb_gamedb;
var userUID


/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { signOut}
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { get}
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { update }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export {
    fb_test, fb_initialise, fb_authenticate, fb_onAuthStateChanged, fb_signOut, fb_writeRecord, fb_readRecord, fb_readAll, fb_destroy
};

function fb_test() {
    console.log("Test")
}
/******************************************************/
// fb_initialise()
// Called by button initialise
// Initialises the database connection
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        const firebaseConfig = {
        apiKey: "AIzaSyAQ4FYhhhVQvTWxBJstBPqUEM7k1z3HNCs",
        authDomain: "comp-2025-william-kan.firebaseapp.com",
        databaseURL: "https://comp-2025-william-kan-default-rtdb.firebaseio.com",
        projectId: "comp-2025-william-kan",
        storageBucket: "comp-2025-william-kan.firebasestorage.app",
        messagingSenderId: "928584832942",
        appId: "1:928584832942:web:caa21627c817d307485a3f",
        measurementId: "G-L6S6H3WPXE"
    };
    

    // Initialize Firebase
    const FB_GAMEAPP = initializeApp(firebaseConfig);
    fb_gamedb= getDatabase(FB_GAMEAPP);
    console.info(fb_gamedb);
    document.getElementById("p_fbInitialise").innerHTML = "Initialised";
    console.log("Hello:")
}

/******************************************************/
// fb_authenticate()
// Called by button authenticate
// uses the google login prompt and creates the popup window which the user can use to select a google account to use.
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_authenticate() {
    console.log("working function")
    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();

    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    // Create a popup window to sign in
    signInWithPopup(AUTH, PROVIDER).then((result) => {
        //document.getElementById("p_fbAuthenticate").innerHTML = "Authenticated";
        
        console.log(result.user.uid);
        console.log(result.user.email);
        console.log(result.user.displayName);
        userUID = result.user.uid;
      //  const userEmail = result.user.email;
      //  const userName = result.user.displayName;
    }).catch((error) => {
        console.log("error authenticating: " + error);
       // document.getElementById("p_fbAuthenticate").innerHTML = "Failled Authenticating";
    });
}

/******************************************************/
// fb_onAuthStateChanged()
// Called by button detect login change
// Detects if the login was sucessful
// Input:  n/a
// Return: n/a



function fb_onAuthStateChanged() {
const AUTH = getAuth();
onAuthStateChanged(AUTH, (user) => {
   if (user) {
        document.getElementById("p_fbAuthenticate").innerHTML = "Logged in";
    } else {
       document.getElementById("p_fbAuthenticate").innerHTML = "Logged out";
      }
    
}, (error) => {
    document.getElementById("p_fbAuthenticate").innerHTML = error;
});
}

/******************************************************/
// fb_signOut()
// Called by button logout
// The user gets logged out of the firebase
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_signOut() {
    console.log("Logging out")
    const AUTH = getAuth();
    signOut(AUTH).then(() => {
        console.log("Logged out")
    })
    .catch((error) => {
        console.log("error:   " + error)
    });
}
function fb_writeRecord() {
    const dbReference= ref(fb_gamedb, "Games/FarLands/${userName}");
    set(dbReference, {Name: "bobby", Score: 3}).then(() => {
        document.getElementById("p_fbWriteRec").innerHTML = "Successful";

    }).catch((error) => {
        console.log("error:  " + error)
        document.getElementById("p_fbWriteRec").innerHTML = "Successful";

    });
}
function fb_readRecord() {
    const dbReference= ref(fb_gamedb, "Games/FarLands/Users/Score");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
        document.getElementById("p_fbReadRec").innerHTML = "Successful";
        console.log("Data: " + fb_data);
        } else {
        document.getElementById("p_fbReadRec").innerHTML = "No Record Found";
        }
    }).catch((error) => {
        console.log("error:  " + error );
    });
}
function fb_readAll() {
    const dbReference= ref(fb_gamedb, "Games/FarLands/Users");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();

        if (fb_data != null) {
            document.getElementById("p_fbReadAll").innerHTML = "successful";
            console.log(fb_data);
       //     ✅ Code for a successful read all goes here

        } else {
            document.getElementById("p_fbReadAll").innerHTML = "No Record Found";
        //    ✅ Code for no record found goes here

        }

    }).catch((error) => {
        console.log("error:  " + error);
      //  ❌ Code for a read all error goes here

    });
}
function fb_updateRecord() {
     const dbReference= ref(fb_gamedb, where-to-write-to);

    update(dbReference, _data).then(() => {

    //    ✅ Code for a successful update goes here

    }).catch((error) => {

 //       ❌ Code for a update error goes here

    });
}
function fb_destroy() {
    const dbReference= ref(fb_gamedb, "/");
    set(dbReference, {greetings: "how are you today"}).then(() => {
        console.log("ez destroy")
    }).catch((error) => {
        console.log("DOESNT WORK" + error)
    });
}




/**************************************************************/
// END OF CODE
/**************************************************************/