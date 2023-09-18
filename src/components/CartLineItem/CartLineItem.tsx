import { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Divider,
  Typography,
  IconButton,
  FormGroup,
  TextField,
  Tooltip,
  Stack,
  Chip,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { LineItem } from '@commercetools/platform-sdk';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { formatPriceCents } from '../../utils/productsUtils';
import { ServerError } from '../../api/types';
import { setAlert } from '../../slices/alerts/slice';
import { changeLineItemQuantity, removeLineItemFromCart } from '../../slices/cart/slice';

import './styles.scss';

type Props = {
  item: LineItem;
  isLast: boolean;
};

export const CartLineItem: React.FC<Props> = ({ item, isLast }: Props): React.ReactElement => {
  const localization = useAppSelector((state) => state.settings.localization);
  const { progress } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const [value, setValue] = useState(item.quantity);

  const onError = useCallback(
    (error: ServerError): void => {
      dispatch(setAlert({ message: error.message, severity: 'error' }));
    },
    [dispatch],
  );

  const handleClickDelete = (): void => {
    const onSuccess = (): void => {};
    dispatch(removeLineItemFromCart({ lineItemId: item.id, onSuccess, onError }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const numValue = +event.target.value;
    if (typeof numValue === 'number' && !Number.isNaN(numValue)) {
      const newValue = numValue || 1;
      if (value !== newValue) {
        const onSuccess = (): void => {
          setValue(newValue);
        };
        dispatch(changeLineItemQuantity({ lineItemId: item.id, quantity: newValue, onSuccess, onError }));
      }
    }
  };

  const handleInc = (): void => {
    const onSuccess = (): void => {
      setValue(value + 1);
    };
    dispatch(changeLineItemQuantity({ lineItemId: item.id, quantity: value + 1, onSuccess, onError }));
  };

  const handleDec = (): void => {
    if (value >= 2) {
      const onSuccess = (): void => {
        setValue(value - 1);
      };

      dispatch(removeLineItemFromCart({ lineItemId: item.id, quantity: 1, onSuccess, onError }));
    }
  };

  const renderPrice = (): React.ReactElement => {
    const fullPriceCentAmount = item.price.value.centAmount;
    const fullPriceCurrencyCode = item.price.value.currencyCode;
    const fullPriceValue = formatPriceCents(fullPriceCentAmount, localization, fullPriceCurrencyCode);
    const isDiscountApplied = !!item.discountedPricePerQuantity.length;

    if (isDiscountApplied) {
      const { discountedPrice } = item.discountedPricePerQuantity[0];
      const cartDiscountPriceCentAmount = discountedPrice.value.centAmount;
      const cartDiscountPriceCurrencyCode = discountedPrice.value.currencyCode;
      const cartDiscountPriceValue = formatPriceCents(
        cartDiscountPriceCentAmount,
        localization,
        cartDiscountPriceCurrencyCode,
      );

      return (
        <Box textAlign="center">
          <Typography className="line-item__old-price" sx={{ lineHeight: 1 }}>
            {fullPriceValue}
          </Typography>
          {item.price.discounted && <Chip label="Sale" color="secondary" size="small" />}
          <Typography variant="h6">{cartDiscountPriceValue}</Typography>
        </Box>
      );
    }

    if (item.price.discounted) {
      const productDiscountPriceCentAmount = item.price.discounted.value.centAmount;
      const productDiscountPriceCurrencyCode = item.price.discounted.value.currencyCode;
      const productDiscountPriceValue = formatPriceCents(
        productDiscountPriceCentAmount,
        localization,
        productDiscountPriceCurrencyCode,
      );

      return (
        <Box textAlign="center">
          <Typography className="line-item__old-price" sx={{ lineHeight: 1 }}>
            {fullPriceValue}
          </Typography>
          <Chip label="Sale" color="secondary" size="small" />
          <Typography variant="h6">{productDiscountPriceValue}</Typography>
        </Box>
      );
    }

    return <Typography variant="h6">{fullPriceValue}</Typography>;
  };

  const renderTotalPrice = (): React.ReactElement => {
    const fullPriceTotalCentAmount = item.price.value.centAmount * item.quantity;
    const fullPriceCurrencyCode = item.price.value.currencyCode;
    const fullPriceTotalValue = formatPriceCents(fullPriceTotalCentAmount, localization, fullPriceCurrencyCode);
    const isDiscountApplied = !!item.discountedPricePerQuantity.length;

    if (isDiscountApplied) {
      const discountedPriceTotalCentAmount = item.totalPrice.centAmount;
      const discountedPriceCurrencyCode = item.totalPrice.currencyCode;

      return (
        <Box textAlign="center">
          <Typography className="line-item__old-price" sx={{ lineHeight: 1 }}>
            {fullPriceTotalValue}
          </Typography>
          <Typography variant="h6" className="line-item_total-price">
            {formatPriceCents(discountedPriceTotalCentAmount, localization, discountedPriceCurrencyCode)}
          </Typography>
        </Box>
      );
    }

    return (
      <Typography variant="h6" className="line-item_total-price">
        {fullPriceTotalValue}
      </Typography>
    );
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
        <Tooltip title="Remove from Cart" placement="top">
          <IconButton
            onClick={handleClickDelete}
            className="delete-control"
            color="error"
            data-testid="delete-btn"
            size="large"
          >
            <DeleteRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box className="line-item_price-wrapper">
        <FormGroup className="line-item_quantity-wrapper">
          <Button onClick={handleDec} disabled={value <= 1 || progress.modifyingCart} size="small">
            <RemoveRoundedIcon />
          </Button>
          <TextField
            variant="outlined"
            value={value}
            size="small"
            onChange={handleChange}
            className="line-item_quantity-input"
            disabled={progress.modifyingCart}
          />
          <Button onClick={handleInc} disabled={progress.modifyingCart} size="small">
            <AddRoundedIcon />
          </Button>
        </FormGroup>
        {renderPrice()}
        <Stack direction="row" alignItems="center">
          <Typography variant="h6" className="line-item_total-price">
            Total:
          </Typography>
          {renderTotalPrice()}
        </Stack>
      </Box>
      {!isLast && <Divider className="line-item_divider" />}
    </>
  );
};
