import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null); //It will create a reference("useRef" is used to reference a field/tag over here ex-> input tag,button tag and so "useRef" is give reference to it)
  const password = useRef(null); //It will create a reference

  const handleButtonClick = () => {
    // Validate the form data
    console.log(email.current.value);
    console.log(password.current.value);
    //console.log(name.current.value);

    const message = checkValidData(email.current.value, password.current.value); //By this one line I validate my "emailId" and "Password"
    console.log(message);
    setErrorMessage(message);
    if (message) return;

    //As soon as user Sign Up I want to update my redux store with user Sign Up Information

    // Sign In Sign Up Logic
    if (!isSignInForm) {
      // Sign Up Logic(Once you call this API It will create a user on firebase and give you a response and If my response is success it will give me a user object and it is signed in automatically whenever you are signing up you are creating a user and you signed in automatically and if there is an error in the API it will going to this 'catch' block and it will 'catch' this error)
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          //It will Signed In Automatically basically when you are signing up you are creating

          //As soon as the new user is successfully registered then navigate to the "browse" page otherwise it give "error"
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/139034009?v=4",
          })
            .then(() => {
              // If you extract from "user" then user will not have updated value so for this we use "auth.currentUser" to get new/updated information
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // If the user logged In I will navigate the user to "browse"
              navigate("/browse"); //This navigate can only happen inside my child component
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          //IF there is no error it will just log the user
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in(Basically When the user SignIn I want to go to browse page)
          const user = userCredential.user;
          //IF THE USER SUCCESS
          console.log(user);
          navigate("/browse"); //This navigate can only happen inside my child component
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700"
          />
          {/** This "ref" will help us to get reference to input box*/}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button
            className="p-4 my-6 bg-red-700 w-full rounded-lg "
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In Now."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
