import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Style
import { outerStyle, borderStyle } from "./styles";

export default function Token({text, color, borderColor}) {

    return (
        <Box sx={outerStyle}>
            <Box sx={borderStyle}>
                <Typography sx={{color:"red"}}>{text}</Typography>
            </Box>
        </Box>
    );
};