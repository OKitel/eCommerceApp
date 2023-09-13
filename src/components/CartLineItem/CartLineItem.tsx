import { useState } from 'react';
import { Box, Button, Divider, Typography, IconButton, FormGroup, TextField } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

export const CartLineItem = (): React.ReactElement => {
  const handleClickDelete = (event: React.MouseEvent<HTMLElement>): void => {
    console.log(event);
  };
  const [value, setValue] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = +event.target.value;
    if (typeof newValue === 'number' && !Number.isNaN(newValue)) {
      setValue(newValue || 1);
    }
  };

  const handleClickAddItem = (): void => {
    setValue(value + 1);
  };

  const handleClickRemoveItem = (): void => {
    if (value >= 2) {
      setValue(value - 1);
    }
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        <img
          style={{ width: '4rem' }}
          src="https://ltm-music.ru/upload/images/banshee_extreme_6_bchb_new.png"
          alt="item"
        />
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Typography variant="h5">Item name</Typography>
        </Box>
        <IconButton
          onClick={handleClickDelete}
          className="delete-control"
          color="error"
          data-testid="delete-btn"
          size="large"
        >
          <DeleteRoundedIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0' }}>
        {/* <ProductPrice selectedVariant={selectedVariant} /> */}
        <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
          <Button onClick={handleClickRemoveItem} disabled={value <= 1} size="small">
            <RemoveRoundedIcon />
          </Button>
          <TextField
            variant="outlined"
            value={value}
            size="small"
            onChange={handleChange}
            sx={{ input: { textAlign: 'center' }, width: '5rem' }}
          />
          <Button onClick={handleClickAddItem} size="small">
            <AddRoundedIcon />
          </Button>
        </FormGroup>
        <Typography variant="h5">$123</Typography>
      </Box>
      <Divider sx={{ margin: '2rem 0' }} />
    </>
  );
};
