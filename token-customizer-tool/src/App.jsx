import Router from "./components/Router/Router";
import './App.css'
import { useState, useEffect, useMemo } from "react";
import { MemoryRouter } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

//Contexts
import { ThemeContext } from "./contexts/ThemeContext";
import { TokensContext } from "./contexts/TokensContext";
import { HolderContext } from "./contexts/HolderContext";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [theme, setTheme] = useState("light");
  const [tokenSet, setTokenSet] = useState([]);
  const [selectedHolder, setSelectedHolder] = useState(1); //Default holder is id=1
  const isMobile = useMediaQuery("(max-width:750px)");

  useEffect(() => {
  document.body.classList.toggle("mobile", isMobile);
}, [isMobile]);

  useEffect(() => {
      const handleBeforeUnload = (e) => {
          e.preventDefault();
          e.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  // MUI theme (IMPORTANT: prevents default blue)
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: theme === "dark" ? "#FEA7B6" : "#FEA7B6" //Ei tue muuttujia
          },
          secondary: {
            main: theme === "dark" ? "#df90c7" : "#db6ab9",
          },
        },
      }),
    [theme]
  );


  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <TokensContext.Provider value={{tokenSet, setTokenSet}}>
        <HolderContext.Provider value={{selectedHolder, setSelectedHolder}}>
          <ThemeProvider theme={muiTheme}>
            <MemoryRouter initialEntries={["/"]}>
              <Router isMobile={isMobile} />
            </MemoryRouter>
          </ThemeProvider>
        </HolderContext.Provider>
      </TokensContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
