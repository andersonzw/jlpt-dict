import JLPTGrammar from "./routes/JLPT Cards/JLPTGrammar.tsx";
import Header from "./routes/Header.tsx";
import { Route, Routes } from "react-router-dom";
import About from "./routes/About.tsx";
import Home from "./routes/Directory/Directory.tsx";
import { SearchProvider } from "./utils/context/SearchContext.tsx";
import Bookmarks from "./routes/Bookmarks/Bookmarks.tsx";
import SignIn from "./routes/SignIn.tsx";
function App() {
  return (
    <div className="">
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/jlpt/:level" element={<JLPTGrammar />} />
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path ="/bookmarks" element={<Bookmarks/>}/>
            <Route path ="/sign-in" element={<SignIn/>}/>
          </Route>
        </Routes>
      </SearchProvider>
    </div>
  );
}

export default App;
