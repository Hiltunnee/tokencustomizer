import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
// import HolderCard from "../HolderCard/HolderCard";
import Radio from "@mui/material/Radio";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from '@mui/material/FormControl';
import { useState, useContext } from "react";
import { HolderContext } from "../../contexts/HolderContext";
import Stack from "@mui/material/Stack";

//Styles
import { cardStyle, contentStyle, manaColorsContainerStyle, radioStyle, labelStyle, manaColorStyle, imageSizeStyle } from "./styles";

export default function ManaColorContainer({ selectedManaColor, setSelectedManaColor}) {
    //Hardcoded mana colors, these shouldn't change
    const availableManaColors = [
        {
            id:1,
            name:"Black",
            imagePath: "black_mana_icon.png",
            alt: "black_mana_icon"
        },
        {
            id:2,
            name:"White",
            imagePath: "white_mana_icon.png",
            alt: "white_mana_icon"
        },
        {
            id:3,
            name:"Blue",
            imagePath: "blue_mana_icon.png",
            alt: "blue_mana_icon"
        },
        {
            id:4,
            name:"Green",
            imagePath: "green_mana_icon.png",
            alt: "green_mana_icon"
        },
        {
            id:5,
            name:"Red",
            imagePath: "red_mana_icon.png",
            alt: "red_mana_icon"
        },
        {
            id:6,
            name:"Colorless",
            imagePath: "colorless_mana_icon.png",
            alt: "colorless_mana_icon"
        },
    ];

    const noManaColor = {
        id: 7,
        name:"Basic preset",
        imagePath: "custom_icon.png",
        alt: "basic_preset_icon"
    };

    const handleChange = (event) => {
        setSelectedManaColor(event.target.value);
    };

    return (
        <Card sx={cardStyle}>
            <FormControl>
                <RadioGroup value={selectedManaColor} onChange={handleChange}>
                    <Stack direction="row" spacing={2}>
                            <Box sx={manaColorsContainerStyle}>
                                {availableManaColors.map(mana => (
                                    <Card sx={manaColorStyle}>
                                        <FormControlLabel value={mana.id} sx={labelStyle} control={<Radio sx={radioStyle}/>} label={
                                            <Box key={mana.id}>
                                                <p>{mana.name}</p>
                                                <img src={mana.imagePath} alt={mana.alt} style={imageSizeStyle}></img>
                                            </Box>
                                        }/>
                                    </Card>
                                ))}
                            </Box>
                            <Card sx={manaColorStyle}>
                                <FormControlLabel value={noManaColor.id} sx={labelStyle} control={<Radio sx={radioStyle}/>} label={
                                    <Box>
                                        <p>{noManaColor.name}</p>
                                        <img src={noManaColor.imagePath} alt={noManaColor.alt} style={imageSizeStyle}></img>
                                    </Box>
                                }/>
                            </Card>
                    </Stack>
                </RadioGroup>
            </FormControl>
        </Card>
    );
};