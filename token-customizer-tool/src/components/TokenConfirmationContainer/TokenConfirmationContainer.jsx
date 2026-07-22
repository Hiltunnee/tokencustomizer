import TokenCustom from "../TokenCustom/TokenCustom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Token from "../Token/Token";
import { boxStyle, amountTextStyle } from "./styles";
import { useEffect } from "react";

export default function TokenConfirmationContainer({tokens}) {

    return (
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: 4.6,
                justifyContent: "start",
                padding: "2em",
                backgroundColor: "var(--background-secondary)",
            }}>
                {tokens.map(token => (
                    <Box key={`${token.text}-${token.baseColor}-${token.borderColor}`} sx={boxStyle}>
                        <Typography sx={amountTextStyle}>x {token.amount}</Typography>
                        <Token text={token.text} color={token.baseCode} borderColor={token.borderCode} isNumberToken={token.isNumberToken} interactable={false}></Token>
                    </Box>
                ))}
            </Box>
    );
};