import { useState } from "react"
import Typography from "@mui/material/Typography"
import Token from "../Token/Token"
import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box"
import { boxStyle, amountTextStyle } from "./styles"

export default function TokenCustom({text, baseColor, borderColor, isNumberToken, amount, onClick}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log("click");
        console.log("Klikattu token:", {
        text,
        amount,
        baseColor,
        borderColor,
        isNumberToken
    });
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };


    return (
        <Box sx={boxStyle}>
            <Typography sx={amountTextStyle}>x {amount}</Typography>
            <Token text={text} color={baseColor} borderColor={borderColor} isNumberToken={isNumberToken} onClick={onClick}></Token>
            {/* <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Token customization</DialogTitle>
                <p>Numero token vai ei?</p>
                <Token text={text} color={baseColor} borderColor={borderColor} isNumberToken={isNumberToken}></Token>

            </Dialog> */}
        </Box>
    )
};