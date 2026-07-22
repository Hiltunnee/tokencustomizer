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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { pageStyle, textCardStyle } from "./styles";
import { TokensContext } from "../../contexts/TokensContext";
import Collapse from "@mui/material/Collapse";
import holderColors from "../../../../store-inventory/holder-colors.json";
import tokenColors from "../../../../store-inventory/token-colors.json";
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import LinkIcon from '@mui/icons-material/Link';
import { sendOrder } from "./sendOrder";
import Token from "../../components/Token/Token";
import TokenConfirmationContainer from "../../components/TokenConfirmationContainer/TokenConfirmationContainer";

export default function Confirmation({ isMobile }) {
    const navigate = useNavigate();
    const { tokenSet, setTokenSet } = useContext(TokensContext);
    const [tokenData, setTokenData] = useState([]);
    const [dataToCopy, setDataToCopy] = useState([]);
    const [openHolders, setOpenHolders] = useState([]);
    const [openSetDeletion, setOpenSetDeletion] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState();
    const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);
    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [orderName, setOrderName] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [startingOver, setStartingOver] = useState(false);
    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [tokensVisual, setTokensVisual] = useState([]);

    const formatTokenData = () => {
        setTokenData(tokenSet.map(set => ({
            holderSize: set.holderSize,
            holder: set.holder.name,
            ...(set.lid !== undefined && { lid: set.lid.name }),
            tokens: set.tokens.map(token => ({
                amount: token.amount,
                text: token.text,
                base: token.baseColor,
                baseCode: token.baseColorCode,
                border: token.borderColor,
                borderCode: token.borderColorCode,
                isNumberToken: token.isNumberToken
            }))
        })));
    };

    useEffect(() => {formatTokenData()},[tokenSet]);

    // const formatCopyData = () => {
    //     setDataToCopy(tokenData.map(set => ({
    //         HS: set.holderSize,
    //         HC: holderColors.colors.find(color => color.name === set.holder)?.abbreviation,
    //         ...(set.lid != undefined && {LD: set.lid}),
    //         T: set.tokens.map(token => ({
    //             kpl: token.amount,
    //             txt: token.text,
    //             P: (tokenColors.colors.find(color => color.name == token.base)?.abbreviation),
    //             S: (tokenColors.colors.find(color => color.name == token.border)?.abbreviation)
    //         }))
    //     })));
    // };

    // useEffect(() => {formatCopyData()}, [tokenData]);

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
        navigate("/");
    };

    const handleDeleteHolderConfirmation = () => {
        setOpenSetDeletion(false);
        setTokenSet(prev => prev.filter((holder, i) => i != indexToDelete));
    };

    const handleDeleteButton = (index) => {
        setIndexToDelete(index);
        setOpenSetDeletion(true);
    };

    // const copyToClipboard = () => {
    //     const json = JSON.stringify(tokenData, null, 2);
    //     navigator.clipboard.writeText(json);
    //     setCopyTooltipOpen(true);
    //     setTimeout(() => setCopyTooltipOpen(false), 1000);
    // };

    const handleSendOrder = async () => {
        const formattedEmailData = formatDataForEmail();

        try {
            setSending(true);
            setError("");

            const result = await sendOrder(orderName, formattedEmailData);

            if (result.success) {
            setSuccess(true);
            setOpenEmailDialog(false);
            setOrderName("");
            } else {
            setError("Sending failed");
            }
        } catch (err) {
            console.error("Send error:", err);
            setError("Sending failed");
        } finally {
            setSending(false);
        }
    };

    const handleStartNewOrder = () => {
        setTokenSet([]);
        navigate("/");
    };

    const formatDataForEmail = () => {
        return tokenSet
            .map((set, index) => {
            const tokens = set.tokens
                .map(
                (token) =>
                    ` ${token.amount} × "${token.text}" ( ${token.baseColor} / ${token.borderColor})`
                )
                .join("\n");

            return [
                `Set ${index + 1}`,
                `Holder size: ${set.holderSize}`,
                `Holder: ${set.holder.name}`,
                ...(set.lid ? [`Lid: ${set.lid.name}`] : []),
                "Tokens:",
                tokens,
            ].join("\n");
            })
            .join("\n\n");
    };

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                {tokenData.map((holder, holderIndex) => 
                    <Card key={holderIndex} sx={{position: "relative", backgroundColor: "var(--background-secondary)"}}>
                        <IconButton sx={{position: "absolute", top: 8, right: 20,}} onClick={() => setOpenHolders(prev => prev.includes(holderIndex)? prev.filter(i => i !== holderIndex): [...prev, holderIndex])}>
                            {openHolders.includes(holderIndex) ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
                        </IconButton>
                        <IconButton disabled={!(tokenSet.length>1)} sx={{position: "absolute", top: 8, right: 60,}} onClick={() => {handleDeleteButton(holderIndex)}}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton sx={{position: "absolute", top: 8, right: 100,}} onClick={() => {handleEditHolder(holderIndex)}}>
                            <EditIcon />
                        </IconButton>
                        <p style={{...(isMobile && {marginLeft: "-100px"}),}}><strong>Holder size:</strong> {holder.holderSize}</p>
                        <Collapse in={openHolders.includes(holderIndex)}>
                            <p>Holder color: <span style={{ fontWeight: 500 }}>{holder.holder}</span></p>
                            {holder.lid && (<p>Lid color: <span style={{ fontWeight: 500 }}>{holder.lid}</span></p>)}
                            {holder.tokens.map((token, index) =>
                                <p key={index}>{token.amount}x <span style={{ fontWeight: 500 }}>{token.text}</span> ({token.base} / {token.border})</p>
                            )}
                            <Box display="flex" sx={{position: "relative", justifyContent: "center"}}>
                                <p>Tokens</p>
                                <IconButton onClick={() =>setTokensVisual(prev => prev.includes(holderIndex) ? prev.filter(i => i !== holderIndex) : [...prev, holderIndex])}>
                                    {tokensVisual.includes(holderIndex) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>
                            <Collapse in={tokensVisual.includes(holderIndex)
                            } sx={{padding: "0% 2% 0%"}}>
                                <TokenConfirmationContainer tokens={holder.tokens} />
                            </Collapse>
                        </Collapse>
                    </Card>
                )}

                <Card sx={textCardStyle}>
                    <p>Please note that this tool is for <strong>illustrative purposes only</strong> and may not perfectly reflect the final product (e.g. text size, positioning, and other details). Send your order and put the name of it in the Etsy order description.</p>
                    <p>If you have specific needs or questions, don't hesitate to contact us!</p>
                    <Stack direction="row" sx={{justifyContent: "center", gap: 0.2, marginBottom: 2}}>
                        <LinkIcon />
                        <Link href="https://linktr.ee/priimacraft?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnZuzZaPhqNGLry9Tx2Igq4lSckaxW7M3fUq9wKZ2I9EEiBFCW59MWk0eOO0E_aem_80L7n-B99CkyXpRXEY_VZg" underline="hover" color="inherit">Priimacraft</Link>
                    </Stack>
                </Card>

                {/* Tokenset deletion dialog */}
                <Dialog
                    open={openSetDeletion}
                    onClose={() => {setOpenSetDeletion(false)}}
                    aria-labelledby="set-deletion-dialog-title"
                    aria-describedby="set-deletion-dialog"
                    PaperProps={{ sx: { backgroundColor: "var(--background-secondary)", padding: "1em" }}}
                >
                    <DialogTitle id="alert-dialog-title" sx={{ padding: "0em 0em 1em 0em" }}>
                        {"Delete set completely?"}
                    </DialogTitle>
                    <Stack direction="row" spacing={2} sx={{justifyContent: "space-around"}}>
                        <Button variant="contained" onClick={() => {setOpenSetDeletion(false)}}>Cancel</Button>
                        <Button variant="contained" onClick={handleDeleteHolderConfirmation} autoFocus>Delete</Button>
                    </Stack>
                </Dialog>

                <Stack direction="row" spacing={isMobile ? 3 : 13} sx={{justifyContent: "space-between"}}>
                    <Button sx={{ padding: "0.5em 1em" }} variant="contained" onClick={handleAddHolder} endIcon={<AddCircleIcon sx={{ mr: 0.5}} />}>
                        Add holder
                    </Button>
                    <Button sx={{ padding: "0.5em 1em" }} variant="contained" onClick={() => setStartingOver(true)} endIcon={<ReplayCircleFilledIcon sx={{ mr: 1}} />}>
                        New order
                    </Button>
                    <Button sx={{ padding: "0.5em 1em" }} variant="contained" onClick={() => setOpenEmailDialog(true)} endIcon={<SendIcon sx={{ mr: 0.5}} />} >
                        Send order
                    </Button>
                </Stack>

                <Dialog
                    open={openEmailDialog}
                    onClose={() => {
                        setInfoTooltipOpen(false);
                        setOpenEmailDialog(false);
                    }}
                    aria-labelledby="set-email-dialog-title"
                    aria-describedby="set-email-dialog"
                    PaperProps={{ sx: { backgroundColor: "var(--background-secondary)", padding: "1em" }}}
                >
                    <DialogTitle id="alert-dialog-title" sx={{ padding: "0em 0em 1em 0em" }}>
                        {"Send order details"}
                    </DialogTitle>
                    <Stack spacing={2} sx={{padding: "0em"}}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <p style={{ margin: 0 }}>Enter order name:</p>

                            {!isMobile && (<Tooltip
                                title="Give the order a unique name and write it in the Etsy order description. Please do not use any sensitive information as the name, as it will not be sent securely."
                                arrow
                            >
                                <IconButton size="small" >
                                    <InfoOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>)}
                            {isMobile && (<Tooltip
                                title="Give the order a unique name and write it in the Etsy order description. Please do not use any sensitive information as the name, as it will not be sent securely."
                                onClose={() => setInfoTooltipOpen(false)}
                                open={infoTooltipOpen}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                slotProps={{
                                    popper: {
                                        disablePortal: true,
                                    },
                                }}
                            >
                                <IconButton size="small" onClick={() => setInfoTooltipOpen(prev => !prev)}>
                                    <InfoOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>)}
                        </Stack>
                        <TextField label="Order name" value={orderName} onChange={(e) => setOrderName(e.target.value)} fullWidth/>
                        <Stack direction="row" spacing={2} sx={{justifyContent: "space-around"}}>
                            <Button variant="contained" onClick={() => setOpenEmailDialog(false)}>Cancel</Button>
                            <Button variant="contained" onClick={handleSendOrder} disabled={!orderName.trim()} autoFocus>Send</Button>
                        </Stack>
                    </Stack>
                </Dialog>

                <Dialog
                    open={startingOver}
                    onClose={() => setStartingOver(false)}
                    aria-labelledby="starting-over-dialog-title"
                    aria-describedby="starting-over-dialog"
                    PaperProps={{ sx: { backgroundColor: "var(--background-secondary)", padding: "1em" }}}
                >
                    <DialogTitle id="starting-over-dialog-title" sx={{ padding: "0em 0em 1em 0em" }}>
                        {"Discard current changes and start a new order?"}
                    </DialogTitle>
                    <Stack direction="row" spacing={2} sx={{justifyContent: "space-around"}}>
                        <Button variant="contained" onClick={() => {setStartingOver(false)}}>Cancel</Button>
                        <Button variant="contained" onClick={handleStartNewOrder} autoFocus>New order</Button>
                    </Stack>
                </Dialog>

                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success">
                        Order sent successfully.
                    </Alert>
                )}
  
            </Stack>
        </Container>
    );
};
