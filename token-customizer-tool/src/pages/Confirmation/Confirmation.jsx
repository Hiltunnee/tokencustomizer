import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { pageStyle, textCardStyle } from "./styles";

export default function Confirmation() {

    const navigate = useNavigate();

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                <Card sx={textCardStyle}>
                    <p>Tilaus tiedot jne jne</p>
                </Card>
                <Box>
                    <Button variant="contained" onClick={() => navigate("/customization")}>
                        Back
                    </Button>
                </Box>
                <Box>
                    <Button variant="contained">
                        Add a holder
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
};