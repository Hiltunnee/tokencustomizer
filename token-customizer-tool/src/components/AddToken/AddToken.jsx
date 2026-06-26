import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

//Style
import { svgStyle, boxStyle, amountTextStyle } from "./styles";

function AddTokenBase({onClick}) {
    return (
    <Box component="svg" viewBox=" 8 20 84 61" sx={svgStyle} onClick={onClick}>
      <polygon points="50 20 92 37 92 81 50 68 8 81 8 37" fill="#7a7a7adc"/>
      <polygon points="50 25 88 40 88 76 50 64 12 76 12 40" fill="#e4d8d8c4"/>
      <text x="50" y="48" textAnchor="middle" dominantBaseline="middle" fontSize="50" fill="black">
        +
      </text>
    </Box>
  );
}

export default function AddToken({onClick}) {
  return (
        <Box sx={boxStyle}>
            <Typography sx={amountTextStyle}>x 1</Typography>
            <AddTokenBase onClick={onClick}></AddTokenBase>
        </Box>
    )
}
