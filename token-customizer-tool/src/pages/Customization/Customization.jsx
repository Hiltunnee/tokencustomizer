import Token from "../../components/Token/Token";
import TokenCustom from "../../components/TokenCustom/TokenCustom";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { pageStyle, textCardStyle } from "./styles";
import { useState, useContext, useEffect } from "react";
import { TokensContext } from "../../contexts/TokensContext";
import { HolderContext } from "../../contexts/HolderContext";
import { useNavigate } from "react-router";
import TokenCustomContainer from "../../components/TokenCustomContainer/TokenCustomContainer";

export default function Customization() {
    const navigate = useNavigate();
    const { tokenSet, setTokenSet } = useContext(TokensContext);
    const [tokenState, setTokenState] = useState(tokenSet[0].tokens);
    const holderSize = tokenSet[0].holderSize;

    const updateTokenContext = () => {};

    useEffect(() => {
        console.log(tokenSet);
        console.log(tokenState);
    }, []);

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                <Card sx={textCardStyle}>
                    <p>Customize your tokens.</p>
                </Card>
                <Box>
                    <Box>
                        <TokenCustomContainer tokens={tokenState} />
                    </Box>
                </Box>
                <Card>
                    <p>You have {holderSize} amount of tokens in your holder!</p>
                </Card>
                <Box>
                    <Button variant="contained" onClick={() => navigate("/home")}>
                        Back
                    </Button>
                </Box>
                <Box>
                    <Button variant="contained" onClick={() => navigate("/confirmation")}>
                        Continue
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
};