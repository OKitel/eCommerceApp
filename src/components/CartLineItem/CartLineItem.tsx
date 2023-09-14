import { useState, useMemo, useCallback } from 'react';
import { Box, Button, Divider, Typography, IconButton, FormGroup, TextField } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { LineItem } from '@commercetools/platform-sdk';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatPriceCents, getFinalPrice } from '../../utils/productsUtils';
import { ServerError } from '../../api/types';
import { setAlert } from '../../slices/alerts/slice';
import { removeLineItemFromCart } from '../../slices/cart/slice';

import './styles.scss';

type Props = {
  item: LineItem;
  isLast: boolean;
};

export const CartLineItem: React.FC<Props> = ({ item, isLast }: Props): React.ReactElement => {
  const localization = useAppSelector((state) => state.settings.localization);
  const currency = useAppSelector((state) => state.settings.currency);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(1);
  const finalPrice = useMemo(() => {
    const price = getFinalPrice(item.variant.prices, currency);
    return formatPriceCents(price, localization, currency);
  }, [item.variant.prices, localization, currency]);

  const onSuccess = useCallback((): void => {}, []);
  const onError = useCallback(
    (error: ServerError): void => {
      dispatch(setAlert({ message: error.message, severity: 'error' }));
    },
    [dispatch],
  );

  const handleClickDelete = (): void => {
    dispatch(removeLineItemFromCart({ lineItemId: item.id, onSuccess, onError }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = +event.target.value;
    if (typeof newValue === 'number' && !Number.isNaN(newValue)) {
      setValue(newValue || 1);
    }
  };

  const handleInc = (): void => {
    setValue(value + 1);
  };

  const handleDec = (): void => {
    if (value >= 2) {
      setValue(value - 1);
      dispatch(removeLineItemFromCart({ lineItemId: item.id, quantity: 1, onSuccess, onError }));
    }
  };

  return (
    <>
      <Box className="line-item_container">
        <Box className="line-item_img-wrapper">
          {item.variant.images && item.variant.images[0] && (
            <img
              className="line-item_img"
              src={item.variant.images[0].url}
              alt={`image of ${item.name[localization]}`}
            />
          )}
        </Box>
        <Box className="line-item_text-wrapper">
          <Typography variant="h5">{item.name[localization]}</Typography>
          <Typography variant="body1">
            {item.variant.attributes?.find((attr) => attr.name === 'color')?.value.label[localization]}
          </Typography>
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
      <Box className="line-item_price-wrapper">
        <FormGroup className="line-item_quantity-wrapper">
          <Button onClick={handleDec} disabled={value <= 1} size="small">
            <RemoveRoundedIcon />
          </Button>
          <TextField
            variant="outlined"
            value={value}
            size="small"
            onChange={handleChange}
            className="line-item_quantity-input"
          />
          <Button onClick={handleInc} size="small">
            <AddRoundedIcon />
          </Button>
        </FormGroup>
        <Typography variant="h5">{finalPrice}</Typography>
      </Box>
      {!isLast && <Divider className="line-item_divider" />}
    </>
  );
};
