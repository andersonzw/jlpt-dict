import JLPTGrammar from "./routes/JLPT Cards/JLPTGrammar.tsx";
import Header from "./routes/Header.tsx";
import { Route, Routes } from "react-router-dom";
import About from "./routes/About.tsx";
import Home from "./routes/Directory/Directory.tsx";
import { SearchProvider } from "./utils/context/SearchContext.tsx";
function App() {
  return (
    <div className="bg-slate-50">
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/jlpt/:level" element={<JLPTGrammar />} />
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </SearchProvider>
    </div>
  );
}

export default App;
