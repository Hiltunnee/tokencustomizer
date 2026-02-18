import HolderCardContainer from "../../components/HolderCardContainer/HolderCardContainer";
import ManaColorContainer from "../../components/ManaColorContainer/ManaColorContainer";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { pageStyle, textCardStyle } from "./styles";
import { useState } from "react";
import Button from "@mui/material/Button";
import { TokensContext } from "../../contexts/TokensContext"
import { useNavigate } from "react-router";

export default function Home() {
    const [selectedManaColor, setSelectedManaColor] = useState(7);

    //const { selectedManaColor, setSelectedManaColor } = useContext(TokensContext);
    const navigate = useNavigate();

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                <Card sx={textCardStyle}>
                    <p>Choose how many tokens you want</p>
                </Card>
                <Box>
                    <HolderCardContainer/>
                </Box>
                <Card sx={textCardStyle}>
                    <p>Choose the base color of your deck</p>
                    <p>You get to freely customize this later!</p>
                </Card>
                <Box>
                    <ManaColorContainer selectedManaColor={selectedManaColor} setSelectedManaColor={setSelectedManaColor} />
                </Box>
                <Box>
                    <Button variant="contained" onClick={() => navigate("/customization")}>
                        Continue
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
};