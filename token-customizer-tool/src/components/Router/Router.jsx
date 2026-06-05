import { Routes, Route } from "react-router-dom";
import CustomStepper from "../CustomStepper/CustomStepper";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";

// Pages
import Home from "../../pages/Home/Home";
import Customization from "../../pages/Customization/Customization";
import Confirmation from "../../pages/Confirmation/Confirmation";

export default function Router() {
  return (
    <>
      {/* <CustomStepper /> */}

      <Box sx={{position: "relative", width: "100%"}}>
        <CustomStepper />
        <Switch sx={{position: "absolute", top: "0", right: "20px", }}/>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </>
  );
}
