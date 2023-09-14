import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import './styles.scss';

const steps = ['Your cart', 'Delivery and payment', 'Done'];

export const CartStepper = (): React.ReactElement => {
  const activeStep = 0;

  return (
    <Box className="cart-stepper_container">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};
