import { useState, useMemo } from 'react';
import { Box, Button, Divider, Typography, IconButton, FormGroup, TextField } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { LineItem } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../store/hooks';
import { formatPriceCents, getFinalPrice } from '../../utils/productsUtils';

type Props = {
  item: LineItem;
};

export const CartLineItem: React.FC<Props> = ({ item }: Props): React.ReactElement => {
  const localization = useAppSelector((state) => state.settings.localization);
  const currency = useAppSelector((state) => state.settings.currency);

  const finalPrice = useMemo(() => {
    const price = getFinalPrice(item.variant.prices, currency);
    return formatPriceCents(price, localization, currency);
  }, [item.variant.prices, localization, currency]);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: '5rem', height: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {item.variant.images && item.variant.images[0] && (
            <img
              style={{ maxWidth: '5rem', maxHeight: '5rem' }}
              src={item.variant.images[0].url}
              alt={`image of ${item.name[localization]}`}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Typography variant="h5">{item.name[localization]}</Typography>
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
        <Typography variant="h5">{finalPrice}</Typography>
      </Box>
      <Divider sx={{ margin: '2rem 0' }} />
    </>
  );
};
