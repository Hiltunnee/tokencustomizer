import HolderCardContainer from "../../components/HolderCardContainer/HolderCardContainer";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { pageStyle, textCardStyle } from "./styles";

export default function Home() {

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
                    <p>Manavärit tänne</p>
                </Box>
            </Stack>
        </Container>
    );
};