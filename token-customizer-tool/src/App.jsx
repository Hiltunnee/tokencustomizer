import TabsRouter from "./components/TabsRouter/TabsRouter";
import './App.css'
import { useState } from "react";

//Contexts
import { ThemeContext } from "./contexts/ThemeContext";
import { TokensContext } from "./contexts/TokensContext";
import { HolderContext } from "./contexts/HolderContext";

function App() {
  const [theme, setTheme] = useState("light");
  const [tokenSet, setTokenSet] = useState([]);
  const [selectedHolder, setSelectedHolder] = useState(1); //Default holder is id=1

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <TokensContext.Provider value={{tokenSet, setTokenSet}}>
        <HolderContext.Provider value={{selectedHolder, setSelectedHolder}}>
          <TabsRouter />
        </HolderContext.Provider>
      </TokensContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
