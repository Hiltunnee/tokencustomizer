import HolderCardContainer from "../../components/HolderCardContainer/HolderCardContainer";
import { useState } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Home() {

    return (
        <Container>
            <Card>
                <p>Choose how many tokens you want</p>
            </Card>
            <Box>
                <HolderCardContainer/>
            </Box>
            <Card>
                <p>Choose the base color of your deck</p>
                <p>You get to freely customize this later!</p>
            </Card>
            <Box>
                <p>Manavärit tänne</p>
            </Box>
        </Container>
    );
};