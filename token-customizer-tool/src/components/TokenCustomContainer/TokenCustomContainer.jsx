import { useState, useContext } from "react";
import { TokensContext } from "../../contexts/TokensContext";
import TokenCustom from "../TokenCustom/TokenCustom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function TokenCustomContainer({tokens}) {

    return (
        <Card>
            <Box sx={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 5, justifyItems: "start", padding: "2em"}}>
                {tokens.map(token => (
                    <TokenCustom key={token.text} text={token.text} baseColor={token.baseColor} borderColor={token.borderColor} isNumberToken={false} amount={token.amount}  />
                ))}
            </Box>
        </Card>
    );
};