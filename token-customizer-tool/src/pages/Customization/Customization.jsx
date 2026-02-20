import Token from "../../components/Token/Token";
import TokenCustom from "../../components/TokenCustom/TokenCustom";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
import { pageStyle, textCardStyle } from "./styles";
import { useState, useContext, useEffect } from "react";
import { TokensContext } from "../../contexts/TokensContext";
import { useNavigate } from "react-router";
import TokenCustomContainer from "../../components/TokenCustomContainer/TokenCustomContainer";

export default function Customization() {
    const navigate = useNavigate();
    const { tokenSet, setTokenSet } = useContext(TokensContext);
    const [tokenState, setTokenState] = useState(tokenSet[0].tokens);
    const holderSize = tokenSet[0].holderSize;
    const [selectedToken, setSelectedToken] = useState(null);

    const updateTokenContext = () => {};

    // useEffect(() => {
    //     console.log(tokenSet);
    //     console.log(tokenState);
    // }, []);

    const handleTokenClick = (token) => {
        setSelectedToken(token);
    };

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                <Card sx={textCardStyle}>
                    <p>Customize your tokens.</p>
                </Card>
                <Box>
                    <Box>
                        <TokenCustomContainer tokens={tokenState} onTokenClick={handleTokenClick} />
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
                {/* Token customization dialog */}
                {selectedToken && (
                    <Dialog open onClose={() => setSelectedToken(null)}>
                        <DialogTitle>Token customization</DialogTitle>
                        <Stack spacing={2} sx={{padding:"20px", textAlign: 'center'}}>
                            <p>Numero token vai ei?</p>
                            <TokenCustom text={selectedToken.text} color={selectedToken.baseColor} borderColor={selectedToken.borderColor} isNumberToken={selectedToken.isNumberToken} amount={selectedToken.amount} onTokenClick={handleTokenClick}></TokenCustom>
                            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
                                <Box>
                                    <p>Base color</p>
                                    <Button style={{width: "2em", height: "2em", backgroundColor: selectedToken.baseColor}}></Button>
                                </Box>
                                <Box>
                                    <p>Border color</p>
                                    <Button style={{width: "2em", height: "2em", backgroundColor: selectedToken.borderColor}}></Button>
                                </Box>
                            </Stack>
                            <Stack direction="row" >
                                <Button>Discard changes</Button>
                                <Button>Save changes</Button>
                            </Stack>
                        </Stack>
                    </Dialog>
                )}
            </Stack>
        </Container>
    );
};