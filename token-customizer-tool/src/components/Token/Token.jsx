import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//Style
import { tokenShape, innerShape, outerStyle, borderStyle, textStyle, numberStyle } from "./styles";

export default function Token({text, color, borderColor, isNumberToken}) {

    return (
        <Box sx={{...tokenShape, ...outerStyle}} backgroundColor={borderColor}>
            <Box sx={{...innerShape, ...borderStyle}} backgroundColor={color}>
                {isNumberToken ? (
                    <Typography sx={{...numberStyle, color:borderColor}}>{text}</Typography>
                ) : (
                    <Typography sx={{...textStyle, color:borderColor}}>{text}</Typography>
                )}
            </Box>
        </Box>
    );
};