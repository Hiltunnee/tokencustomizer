import Token from "../../components/Token/Token";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import NumberSpinner from "../../components/NumberSpinner/NumberSpinner";
import Box from "@mui/material/Box";
import { pageStyle, textCardStyle } from "./styles";
import { useState, useContext, useEffect } from "react";
import { TokensContext } from "../../contexts/TokensContext";
import { useNavigate } from "react-router";
import TokenCustomContainer from "../../components/TokenCustomContainer/TokenCustomContainer";
import NumberChanger from "../../components/NumberChanger/NumberChanger";
import TokenWithInput from "../../components/TokenWithInput/TokenWithInput";
import tokenColors from "../../../../store-inventory/token-colors.json";

export default function Customization() {
    const navigate = useNavigate();
    const { tokenSet, setTokenSet } = useContext(TokensContext);
    const [tokenState, setTokenState] = useState(tokenSet[0].tokens.map(
        token => ({...token, isNumberToken: /\d/.test(token.text) ? true : false})
    ));

    const holderSize = tokenSet[0].holderSize;
    const tokenAmount = holderSize;

    const [selectedToken, setSelectedToken] = useState(null);
    const [updatedSelectedToken, setUpdatedSelectedToken] = useState(null);
    const [availableTokenColors, setAvailableTokenColors] = useState(tokenColors.colors.filter(color => color.available == true));

    const updateTokenContext = () => {};

    const handleTokenClick = (token) => {
        setSelectedToken(token);
        setUpdatedSelectedToken(token);
    };

    const updateAmount = (change) => {
        setUpdatedSelectedToken({...updatedSelectedToken, amount: updatedSelectedToken.amount + change});
    };

    const updateBaseColor = (event) => {
        const selectedColorCode = event.target.value;
        const selectedColorName = availableTokenColors.find(col => col.colorCode == selectedColorCode).name;
        setUpdatedSelectedToken({...updatedSelectedToken, baseColorCode: event.target.value, baseColor: selectedColorName});
    };

    const updateBorderColor = (event) => {
        const selectedColorCode = event.target.value;
        const selectedColorName = availableTokenColors.find(col => col.colorCode == selectedColorCode).name;
        setUpdatedSelectedToken({...updatedSelectedToken, borderColorCode: event.target.value, borderColor: selectedColorName});
    };

    const updateTokenType = () => {
        if (updatedSelectedToken.isNumberToken) {
            if (selectedToken.isNumberToken) {
                setUpdatedSelectedToken({...updatedSelectedToken, text: "", isNumberToken: false});
            } else {
                setUpdatedSelectedToken({...updatedSelectedToken, text: selectedToken.text, isNumberToken: false});
            }
        } else {
            setUpdatedSelectedToken({...updatedSelectedToken, text: "+1+1", isNumberToken: true});
        }
    };

    const saveUpdates = () => {
        if (selectedToken != updatedSelectedToken) {
            setTokenState(prev => 
                prev.map(token => 
                    token.text == selectedToken.text && 
                    token.baseColor == selectedToken.baseColor && 
                    token.borderColor == selectedToken.borderColor 
                    ? updatedSelectedToken : token
                )
            );
        }
        setSelectedToken(null)
    };

    useEffect(() => {
        console.log(tokenState);
    }, [tokenState]);

    useEffect(() => {
        console.log(updatedSelectedToken);
    }, [updatedSelectedToken]);

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
                <Stack direction="row" sx={{justifyContent: "space-between"}}>
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
                {/* Token customization dialog */}
                {selectedToken && (
                    <Dialog open onClose={() => setSelectedToken(null)}>
                        <DialogTitle>Token customization</DialogTitle>
                        <Stack spacing={2} sx={{padding:"20px", textAlign: 'center', alignItems: "center",}}>
                            <ToggleButtonGroup
                                color="primary"
                                value={updatedSelectedToken.isNumberToken}
                                exclusive
                                onChange={updateTokenType}
                                aria-label="Token-type"
                                >
                                <ToggleButton value={true}>Numeric</ToggleButton>
                                <ToggleButton value={false}>Keyword</ToggleButton>
                            </ToggleButtonGroup>
                            {!updatedSelectedToken.isNumberToken && (
                                <TextField id="keyword-input" variant="outlined" value={updatedSelectedToken.text} onChange={(event) => {setUpdatedSelectedToken(prev => ({...prev, text: event.target.value.toUpperCase()}))}}/>
                            )}
                            {updatedSelectedToken.isNumberToken && (
                                <NumberSpinner label="Number Spinner" min={10} max={40} />
                            )}
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <TokenWithInput text={updatedSelectedToken.text} color={updatedSelectedToken.baseColorCode} borderColor={updatedSelectedToken.borderColorCode} isNumberToken={updatedSelectedToken.isNumberToken} interactable={false}></TokenWithInput>
                                <NumberChanger amount={updatedSelectedToken.amount} changeAmount={updateAmount} />
                            </Stack>
                            <Stack direction="row" spacing={3} justifyContent="center" divider={<Divider orientation="vertical" flexItem />}>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel id="basecolor-select-label">Base color</InputLabel>
                                        <Select
                                        labelId="basecolor-select-label"
                                        id="basecolor-select"
                                        value={updatedSelectedToken.baseColorCode}
                                        onChange={updateBaseColor}
                                        >
                                            {availableTokenColors.map(col => 
                                            <MenuItem value={col.colorCode}>
                                                <Stack direction="row">
                                                    <Box sx={{width: "1.3em", borderRadius: "2px", backgroundColor: col.colorCode}}>    
                                                    </Box>
                                                    {col.name}
                                                </Stack>
                                            </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel id="bordercolor-select-label">Border color</InputLabel>
                                        <Select
                                        labelId="bordercolor-select-label"
                                        id="bordercolor-select"
                                        value={updatedSelectedToken.borderColorCode}
                                        onChange={updateBorderColor}
                                        >
                                            {availableTokenColors.map(col => 
                                            <MenuItem value={col.colorCode}>
                                                <Stack direction="row" >
                                                    <Box sx={{width: "1.3em", borderRadius: "2px", backgroundColor: col.colorCode}}>    
                                                    </Box>
                                                    {col.name}
                                                </Stack>
                                            </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Stack>
                            <Stack direction="row" >
                                <Button onClick={() => setSelectedToken(null)}>Discard changes</Button>
                                <Button onClick={saveUpdates}>Save changes</Button>
                            </Stack>
                        </Stack>
                    </Dialog>
                )}
            </Stack>
        </Container>
    );
};