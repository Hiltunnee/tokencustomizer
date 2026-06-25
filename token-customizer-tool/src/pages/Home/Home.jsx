import HolderCardContainer from "../../components/HolderCardContainer/HolderCardContainer";
import ManaColorContainer from "../../components/ManaColorContainer/ManaColorContainer";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import logo_white from "../../../public/logo_white.png";
import Box from "@mui/material/Box";
import { pageStyle, textCardStyle } from "./styles";
import { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { TokensContext } from "../../contexts/TokensContext"
import { HolderContext } from "../../contexts/HolderContext";
import setInventory from "../../../../store-inventory/presets.json"
import { useNavigate } from "react-router";

export default function Home() {
    //Basic set
    //const [selectedManaColor, setSelectedManaColor] = useState(7); //Tämä
    const { selectedHolder, setSelectedHolder } = useContext(HolderContext);
    const { tokenSet, setTokenSet } = useContext(TokensContext);
    const [openWelcomeDialog, setOpenWelcomeDialog] = useState(true);
    const navigate = useNavigate();

    //Holder id: 1.16x, 2.32x, 3.48x 
    //Mana id: 1.Black, 2.White, 3.Blue, 4.Green, 5.Red, 6.Colorless, 7.Basic
    // const searchMatchingPreset = () => {
    //     const holderSizeFromId = (selectedHolder == 3) ? 48 : (selectedHolder == 2) ? 32 : 16
    //     const matchingColorSets = setInventory.presets.filter(preset => preset.ManaId == selectedManaColor).flatMap(preset => preset.sets);
    //     const matchingSet = matchingColorSets.filter(preset => preset.holderSize == holderSizeFromId).flatMap(preset => preset);
    //     if (matchingSet.length == 0) {
    //         console.log("PRESET PUUTTUU!");
    //     } else {
    //         matchingSet[0].tokens.forEach(token => {
    //             token.baseColor = "Black",
    //             token.baseColorCode = "#000000",
    //             token.borderColor = "White",
    //             token.borderColorCode = "#ffffff",
    //             token.text = token.text.toUpperCase()
    //         });
    //     };

    //     //Onko kyseessä eka holder
    //     if (tokenSet.length == 0) {
    //         setTokenSet(matchingSet);
    //     } else {
    //         setTokenSet([...matchingSet, ...tokenSet]);
    //     }
    // };

    const moveToCustomization = () => {
        // searchMatchingPreset();
        prepareTokenSetForCustomization();
        navigate("/customization");
    };

    const prepareTokenSetForCustomization = () => {
        const holderSizeFromId = (selectedHolder == 3) ? 48 : (selectedHolder == 2) ? 32 : 16
        const emptyTokenSet = {
            holderSize: holderSizeFromId,
            holder: null,
            tokens: [],
        };
        setTokenSet([emptyTokenSet, ...tokenSet]);
    };

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                <Box>
                    <HolderCardContainer/>
                </Box>
                <Card sx={textCardStyle}>
                    <p>Choose the size of the holder</p>
                    {/* <p>Choose the base color of your deck</p>
                    <p>You get to freely customize this later!</p> */}
                </Card>
                {/* <Box>
                    <ManaColorContainer selectedManaColor={selectedManaColor} setSelectedManaColor={setSelectedManaColor} />
                </Box> */}
                <Stack direction="row" sx={{justifyContent: "flex-end"}}>
                    <Button variant="contained" onClick={moveToCustomization}>
                        Continue
                    </Button>
                </Stack>
            </Stack>

            <Dialog
                open={openWelcomeDialog}
                onClose={() => {setOpenWelcomeDialog(false)}}
                aria-labelledby="welcome-dialog-title"
                aria-describedby="welcome-dialog"
                PaperProps={{ sx: { backgroundColor: "var(--background-secondary)", margin: "30px" }}}
            >
                <img src={logo_white} alt="Logo" style={{width: "300px", height: "auto", margin: "20px 30px 0px 30px", display: "block"}} />
                <p>Welcome to Token Customizer!</p>
                <Button variant="contained" sx={{ width: "50%", marginBottom: "30px", alignSelf: "center" }} onClick={() => {setOpenWelcomeDialog(false)}}>Start</Button>
            </Dialog>
        </Container>
    );
};