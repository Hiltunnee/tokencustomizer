import TokenCustom from "../TokenCustom/TokenCustom";
import Card from "@mui/material/Card";
import AddToken from "../../components/AddToken/AddToken";
import Box from "@mui/material/Box";

export default function TokenCustomContainer({tokens, onTokenClick, onNewTokenClick}) {

    return (
        <Card>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 120px))",
                gap: 4.6,
                justifyContent: "start",
                padding: "2em",
                backgroundColor: "var(--background-secondary)",
            }}>
                {tokens.map(token => (
                    <TokenCustom key={`${token.text}-${token.baseColor}-${token.borderColor}`} text={token.text} baseColor={token.baseColorCode} borderColor={token.borderColorCode} isNumberToken={token.isNumberToken} amount={token.amount} onClick={() => onTokenClick(token)}  />
                ))}
                <AddToken onClick={onNewTokenClick}/>
            </Box>
        </Card>
    );
};