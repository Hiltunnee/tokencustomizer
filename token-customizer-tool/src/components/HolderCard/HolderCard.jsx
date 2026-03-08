import Card from "@mui/material/Card";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";

//Style
import { holderCardStyle, radioButtonStyle, boxStyle, labelStyle, imageStyle } from "./styles";

export default function HolderCard({id, name, imagePath, alt}) {

    return (
        <Card sx={holderCardStyle}>
            <FormControlLabel value={id} sx={labelStyle} control={<Radio sx={radioButtonStyle}/>} label={
                <Box sx={boxStyle}>
                    <p>{name}</p>
                    <img src={imagePath} style={imageStyle} alt={alt}></img>
                </Box>
            }
            />
        </Card>
    );
};