import { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../library/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import upload from "../../library/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    // This gives an event
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    // VALIDATE INPUTS
    if (!username || !email || !password)
      return toast.warn("Please enter inputs!"), setLoading(false);
    if (!avatar.file)
      return toast.warn("Please upload an avatar!"), setLoading(false);

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log(querySnapshot);
      return (
        toast.warn("This username already exists! Select another username."),
        setLoading(false)
      );
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can sign in now!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfull");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-evenly">
      <div className="flex flex-col items-center gap-4 ">
        <h2 className="text-3xl font-bold">Welcome back,</h2>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleLogin}
        >
          <input
            className="px-8 py-4 text-sm rounded-lg outline-none border-none bg-[#111E34]"
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            className="px-8 py-4 text-sm rounded-lg outline-none border-none bg-[#111E34]"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            className="w-full py-4 bg-[#1E8AEA] rounded-lg disabled:cursor-not-allowed disabled:bg-[#1e8bea89]"
            disabled={loading}
          >
            {loading ? "Loading" : "Sign In"}
          </button>
        </form>
      </div>

      <div className="w-[1px] h-[80%] bg-[#dddddd35]"></div>

      <div className="flex flex-col items-center gap-4 ">
        <h2 className="text-3xl font-bold">Create an account</h2>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleRegister}
        >
          <label
            className="w-full flex items-center justify-between hover:underline cursor-pointer"
            htmlFor="file"
          >
            <img
              className="w-12 h-12 object-cover rounded-full opacity-65"
              src={avatar.url || "./avatar.png"}
            />
            Upload an image
          </label>
          <input
            className="hidden"
            onChange={handleAvatar}
            id="file"
            type="file"
          />
          <input
            className="px-8 py-4 text-sm rounded-lg outline-none border-none bg-[#111E34]"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="px-8 py-4 text-sm rounded-lg outline-none border-none bg-[#111E34]"
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            className="px-8 py-4 text-sm rounded-lg outline-none border-none bg-[#111E34]"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            className="w-full py-4 bg-[#1E8AEA] rounded-lg disabled:cursor-not-allowed disabled:bg-[#1e8bea89]"
            disabled={loading}
          >
            {loading ? "Creating an account" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// NOTES

// FormData is a built-in JavaScript class used to create an object that represents form fields and their values. It is primarily designed for sending form data via fetch() or XMLHttpRequest, especially in scenarios like file uploads or when you need to handle multi-part form submissions.

// When you pass e.target (the form element) to new FormData(e.target), it automatically collects all the form's fields (like inputs, textareas, checkboxes) and their values.


// setDoc():
// The setDoc() function is used to set (create or overwrite) a document in a Firestore collection.
// It accepts two parameters:
// A reference to the document (where to store it).
// The data to be stored in the document.