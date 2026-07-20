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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { sendOrder } from "./sendOrder";

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

    const copyToClipboard = () => {
        const json = JSON.stringify(tokenData, null, 2);
        navigator.clipboard.writeText(json);
        setCopyTooltipOpen(true);
        setTimeout(() => setCopyTooltipOpen(false), 1000);
    };

    const handleSendOrder = async () => {
        const formattedEmailData = formatDataForEmail();

        try {
            setSending(true);
            setError("");

            const result = await sendOrder(orderName, formattedEmailData);

            if (result.success) {
            console.log("Sending order with name:", orderName);
            console.log("Formatted email data:", formattedEmailData);

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
                {tokenData.map((holder, index) => 
                    <Card key={index} sx={{position: "relative", backgroundColor: "var(--background-secondary)"}}>
                        <IconButton sx={{position: "absolute", top: 8, right: 20,}} onClick={() => setOpenHolders(prev => prev.includes(index)? prev.filter(i => i !== index): [...prev, index])}>
                            {openHolders.includes(index) ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
                        </IconButton>
                        <IconButton disabled={!(tokenSet.length>1)} sx={{position: "absolute", top: 8, right: 60,}} onClick={() => {handleDeleteButton(index)}}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton sx={{position: "absolute", top: 8, right: 100,}} onClick={() => {handleEditHolder(index)}}>
                            <EditIcon />
                        </IconButton>
                        <p style={{...(isMobile && {marginLeft: "-100px"}),}}><strong>Holder size:</strong> {holder.holderSize}</p>
                        <Collapse in={openHolders.includes(index)}>
                            <Card sx={textCardStyle}>
                                <p>Holder color: <span style={{ fontWeight: 500 }}>{holder.holder}</span></p>
                                {holder.lid && (<p>Lid color: <span style={{ fontWeight: 500 }}>{holder.lid}</span></p>)}
                                {holder.tokens.map((token, index) =>
                                    <p key={index}>{token.amount}x <span style={{ fontWeight: 500 }}>{token.text}</span> ({token.base} / {token.border})</p>
                                )}
                            </Card>
                        </Collapse>
                    </Card>
                )}

                {/* Tokenset deletion dialog */}
                <Dialog
                    open={openSetDeletion}
                    onClose={() => {setOpenSetDeletion(false)}}
                    aria-labelledby="set-deletion-dialog-title"
                    aria-describedby="set-deletion-dialog"
                    PaperProps={{ sx: { backgroundColor: "var(--background-secondary)" }}}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete set completely?"}
                    </DialogTitle>
                    <Stack direction="row" sx={{justifyContent: "space-around", padding: "1em"}}>
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
                    PaperProps={{ sx: { backgroundColor: "var(--background-secondary)" }}}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Send order details"}
                    </DialogTitle>
                    <Stack spacing={2} sx={{padding: "1em"}}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <p style={{ margin: 0 }}>Enter order name:</p>

                            {!isMobile && (<Tooltip
                                title="Give the order a unique name (for example, the Etsy order number if you have already placed the order) and inform the seller of it. Please do not put any sensitive information in the order name, as it will not be sent securely."
                                arrow
                            >
                                <IconButton size="small" >
                                    <InfoOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>)}
                            {isMobile && (<Tooltip
                                title="Give the order a unique name (for example, the Etsy order number if you have already placed the order) and inform the seller of it. Please do not put any sensitive information in the order name, as it will not be sent securely."
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
                    PaperProps={{ sx: { backgroundColor: "var(--background-secondary)" }}}
                >
                    <DialogTitle id="starting-over-dialog-title">
                        {`Delete current changes \n
                        and start new order?`}
                    </DialogTitle>
                    <Stack direction="row" sx={{justifyContent: "space-around", padding: "1em"}}>
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
