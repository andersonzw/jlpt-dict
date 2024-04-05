import JLPTGrammar from "./routes/JLPTGrammar.tsx";
import Header from "./routes/Header.tsx";
import { Route, Routes } from "react-router-dom";
import About from "./routes/About.tsx";
function App() {

  return (
    <div className="bg-slate-50">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path= "/jlpt/:level"  element={<JLPTGrammar />} />
          <Route index  element={<About/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
