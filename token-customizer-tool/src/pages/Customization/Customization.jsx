import Token from "../../components/Token/Token";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { pageStyle, textCardStyle } from "./styles";
import { useNavigate } from "react-router";

export default function Customization() {

    const navigate = useNavigate();

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                <Card sx={textCardStyle}>
                    <p>Choose how many tokens you want</p>
                </Card>
                <Box>
                    <Box>
                        <Token text="+1  +1" color="black" borderColor="red" isNumberToken={true} />
                    </Box>
                </Box>
                <Card>
                    <p>Choose the base color of your deck</p>
                    <p>You get to freely customize this later!</p>
                </Card>
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
        </Container>
    );
};