import { Routes, Route } from "react-router-dom";
import CustomStepper from "../CustomStepper/CustomStepper";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { styled } from "@mui/material/styles";

// Pages
import Home from "../../pages/Home/Home";
import Customization from "../../pages/Customization/Customization";
import Confirmation from "../../pages/Confirmation/Confirmation";

export default function Router({ isMobile }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
  }

  const ThemeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,

    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      transition: "0.2s",

      "&.Mui-checked": {
        transform: "translateX(22px)",

        "& .MuiSwitch-thumb::before": {
          //Kuu
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401'/%3E%3C/svg%3E\")",
        },
      },
    },

    "& .MuiSwitch-thumb": {
      width: 32,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",

      "&::before": {
        content: '""',
        position: "absolute",
        width: "70%",
        height: "70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        //Aurinko
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Cpath d='M12 2v2'/%3E%3Cpath d='M12 20v2'/%3E%3Cpath d='m4.93 4.93 1.41 1.41'/%3E%3Cpath d='m17.66 17.66 1.41 1.41'/%3E%3Cpath d='M2 12h2'/%3E%3Cpath d='M20 12h2'/%3E%3Cpath d='m6.34 17.66-1.41 1.41'/%3E%3Cpath d='m19.07 4.93-1.41 1.41'/%3E%3C/svg%3E\")"
      },
    },

    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <>
      <Box sx={{position: "relative", width: "100%"}}>
        <CustomStepper isMobile={isMobile} />
        <ThemeSwitch sx={isMobile ? {position: "absolute", top: "-5px", right: "10px", } : {position: "absolute", top: "-5px", right: "20px", }} onChange={handleThemeToggle} checked={theme === "dark"} />
      </Box>

      <Routes>
        <Route path="/" element={<Home isMobile={isMobile}/>} />
        <Route path="/customization" element={<Customization isMobile={isMobile}/>} />
        <Route path="/confirmation" element={<Confirmation isMobile={isMobile}/>} />
      </Routes>
    </>
  );
}
