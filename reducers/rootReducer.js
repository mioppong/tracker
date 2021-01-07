import firebase from "firebase";

/*
DIDNT REALLY PAY ATTENTION CREATING THIS FILE, NOT REALLY USED MUCH, EXCEPT FOR POSTS I THINK
/*/

const SET_INFO = "SET_INFO";
const REFRESH = "REFRESH";
const MESSAGE = "MESSAGE";

var name = "";
var email = "";
var uid = "";
var photoURL = "";

var postings = [];

var user = firebase.auth().currentUser;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoURL = user.photoURL;
  uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
}

const getPosts = () => {
  //  THIS METHOD GETS THE LIST OF POSTS NOT DOWNLOADED YET
  firebase
    .database()
    .ref("/posts/")
    .on("value", (snapshot) => {
      var numOfMissingPosts = snapshot.numChildren() - postings.length;

      if (numOfMissingPosts > 0) {
        var array = [];
        snapshot.forEach((snap) => {
          array.push(snap);
        });

        for (let index = 0; index < numOfMissingPosts; index++) {
          postings.unshift(array.pop());
        }
      }
    });
};

//console.log("POSTING ARE ALL IJNTHE VARIABLE -----", postings);
var initState = {
  user: {
    uid,
    name,
    email,
    photoURL,
  },

  posts: postings,
};

const rootReducer = (state = initState, action) => {
  if (action.type === SET_INFO) {
    state.user.id = action.user.id;
    state.user.email = action.user.email;
    state.user.name = action.user.name;
    state.user.photoURL = action.user.photoUrl;

    //SET USER INFORMATION HERE
  } else if (action.type === REFRESH) {
    //LOAD posts from people
    getPosts();
  } else if (action.type === MESSAGE) {
    //IDK WHAT TO DO HERE' WE'' EVENTUALLY FIRURE IT OUT
  }

  return state;
};

export default rootReducer;
