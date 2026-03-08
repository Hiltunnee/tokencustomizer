import Box from "@mui/material/Box";

//Style
import { svgStyle, numberTokenStyle, textTokenStyle, smallTextTokenStyle, svgStyleNoInteraction } from "./styles";

export default function Token({text, color, borderColor, isNumberToken, onClick, interactable=true}) {
  const lines = text.split("\n"); 
  const twoRows = lines.length > 1; 
  const smallerText = text.length < 10;

  return (
    <Box component="svg" viewBox=" 8 20 84 61" sx={interactable ? svgStyle : svgStyleNoInteraction} onClick={onClick}>
      <polygon points="50 20 92 37 92 81 50 68 8 81 8 37" fill={borderColor}/>
      <polygon points="50 25 88 40 88 76 50 64 12 76 12 40" fill={color}/>
      {!twoRows && (
        <text x="50" y="53" textAnchor="middle" dominantBaseline="middle" fill={borderColor} style={isNumberToken ? numberTokenStyle : smallerText ? smallTextTokenStyle : textTokenStyle}>
          {text}
        </text>
      )}
      {twoRows && (
        <text x="50" y="45" textAnchor="middle" fill={borderColor} style={isNumberToken ? numberTokenStyle : textTokenStyle}>
          {lines.map((line, i) => (
            <tspan
              key={i}
              x={50}
              dy={i === 0 ? 0 : "1.2em"}
              textAnchor="middle"
              dominantBaseline={i === 0 ? "middle" : undefined}
            >
              {line}
            </tspan>
          ))}
        </text>
      )}
    </Box>
  );
}
