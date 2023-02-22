import { useState, createContext, useMemo } from "react";
import styles from "./App.module.css"
import Result from './components/Result/Result';
import Buttons from "./components/Buttons/Buttons";

export const Context = createContext();

function App() {

  const [result, setResult] = useState(0);

  const value = useMemo(() => { return { result, setResult }}, [result, setResult]);

  return (
    <div className={styles.app}>
      <Context.Provider value={value}>
        <Result />
        <Buttons />
      </Context.Provider>
    </div>
  );
}

export default App;
