import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useLocation } from "react-router-dom";

export default function CustomStepper({ isMobile }) {
    const location = useLocation();

    const steps = [
        'Choose holder size and preset',
        'Customize holder and tokens',
        'Order information',
        ];

    const stepsMap = {
        '/': 0,
        '/customization': 1,
        '/confirmation': 2,
    };

    const activeStep = stepsMap[location.pathname] ?? 0;

    return (
        <Box sx={isMobile ? { width: '80%' , margin: "0 auto", my: 4} : { width: '50%' , margin: "0 auto", my: 4}}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{
            '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                color: 'var(--text-primary)', // Just text label (COMPLETED)
                },
            '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                color: 'var(--text-primary)', // Just text label (ACTIVE)
                },
            '& .MuiStepLabel-label.Mui-disabled.MuiStepLabel-alternativeLabel': {
                color: 'var(--background-secondary)', // Just text label (INACTIVE)
                },
            }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel sx={{color: "pink"}}>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Box>
    );
};