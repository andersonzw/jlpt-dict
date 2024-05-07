import JLPTGrammar from "./routes/JLPT Cards/JLPTGrammar.tsx";
import Header from "./routes/Header.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Directory/Directory.tsx";
import { SearchProvider } from "./utils/context/SearchContext.tsx";
import Bookmarks from "./routes/Bookmarks/Bookmarks.tsx";
import SignIn from "./routes/Auth/SignIn.tsx";
import SignUp from "./routes/Auth/SignUp.tsx";
import { useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase/firebase-config.ts";
import { useAppDispatch } from "./utils/store.ts";
import {
  signInUserStore,
  signOutUserStore,
} from "./utils/slices/userReducer.ts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch(signInUserStore({ uid: user.uid, email: user.email }));
      } else {
        dispatch(signOutUserStore());
      }
    });
    return () => listen();
  }, [dispatch]);

  return (
    <div className="">
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/jlpt/:level" element={<JLPTGrammar />} />
            <Route index element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </SearchProvider>
    </div>
  );
}

export default App;
