import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { pageStyle, textCardStyle } from "./styles";
import { TokensContext } from "../../contexts/TokensContext";
import Collapse from "@mui/material/Collapse";

export default function Confirmation() {
    const navigate = useNavigate();
    const { tokenSet, setTokenSet } = useContext(TokensContext);
    const [tokenData, setTokenData] = useState([]);
    const [openHolders, setOpenHolders] = useState([]);

    const formatTokenData = () => {
        setTokenData(tokenSet.map(set => ({
            holderSize: set.holderSize,
            holder: set.holder.name,
            ...(set.lid !== undefined && { lid: set.lid.name }),
            tokens: set.tokens.map(token => ({
                amount: token.amount,
                text: token.text,
                base: token.baseColor,
                border: token.borderColor
            }))
        })));
    };

    useEffect(() => {formatTokenData()},[tokenSet]);

    const handleEditHolder = (holderIndex) => {
        if (holderIndex!=0) {
            let newHolders = [...tokenSet];
            const holderToEdit = tokenSet[holderIndex];
            newHolders.splice(holderIndex, 1);
            newHolders.splice(0, 0, holderToEdit);
            setTokenSet(newHolders);
        }
        navigate("/customization");
    };

    const handleAddHolder = () => {
        navigate("/home");
    };

    const copyToClipboard = () => {
        const json = JSON.stringify(tokenData, null, 2);
        navigator.clipboard.writeText(json);
    };

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                {tokenData.map((holder, index) => 
                    <Card key={index} sx={{position: "relative"}}>
                        <IconButton sx={{position: "absolute", top: 8, right: 20,}} onClick={() => setOpenHolders(prev => prev.includes(index)? prev.filter(i => i !== index): [...prev, index])}>
                            {openHolders.includes(index) ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
                        </IconButton>
                        <IconButton disabled={!(tokenSet.length>1)} sx={{position: "absolute", top: 8, right: 60,}} onClick={() => {setTokenSet(prev => prev.filter((holder, i) => i != index))}}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton sx={{position: "absolute", top: 8, right: 100,}} onClick={() => {handleEditHolder(index)}}>
                            <EditIcon />
                        </IconButton>
                        <p><strong>Holder size:</strong> {holder.holderSize}</p>
                        <Collapse in={openHolders.includes(index)}>
                            <Card sx={textCardStyle}>
                                <p>Holder color: {holder.holder}</p>
                                {holder.lid && (<p>Lid color: {holder.lid}</p>)}
                                {holder.tokens.map((token, index) =>
                                    <p key={index}>{token.amount}x {token.text} ({token.base} / {token.border})</p>
                                )}
                            </Card>
                        </Collapse>
                    </Card>
                )}

                <Box>
                    <Button variant="contained" onClick={handleAddHolder}>
                        Add a holder
                    </Button>
                    <IconButton onClick={copyToClipboard}>
                        <ContentCopyIcon />
                    </IconButton>
                </Box>
                <Stack direction="row" sx={{justifyContent: "flex-start"}}>
                    <Button disabled variant="contained" onClick={() => navigate("/customization")}>
                        Back
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};