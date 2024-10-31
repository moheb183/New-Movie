import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "../Shared/Header";
import Routers from "../routers/Routers";
import { useState } from "react";
import { LanguageContext } from "../Context/LanguageContext";

function App() {
  const [Lang, setLang] = useState("en");
  return (
    <div>
      <LanguageContext.Provider value={{ Lang, setLang }}>
        <Header />
        <Routers />
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
