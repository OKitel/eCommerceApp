import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../store/hooks';
import { getVariantAttributeLocalizedEnumValue } from '../../utils/productsUtils';

type ProductVariantSelectorProps = {
  product: ProductProjection;
  selectedVariant: ProductVariant;
  setSelectedVariant: React.Dispatch<React.SetStateAction<ProductVariant>>;
};

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  product,
  selectedVariant,
  setSelectedVariant,
}): JSX.Element | null => {
  const localization = useAppSelector((state) => state.settings.localization);
  const allVariants = [product.masterVariant, ...product.variants];
  const selectedVariantColor = getVariantAttributeLocalizedEnumValue(selectedVariant, 'color', localization);

  if (!product.variants.length) {
    return null;
  }

  const handleChangeColor = (event: SelectChangeEvent): void => {
    const selectedColorKey = event.target.value;
    const variantFound = allVariants.find((variant) => {
      const variantColor = getVariantAttributeLocalizedEnumValue(variant, 'color', localization);

      return variantColor.key === selectedColorKey;
    });

    if (variantFound) {
      setSelectedVariant(variantFound);
    }
  };

  return (
    <FormControl>
      <InputLabel size="small" id="color-select-label">
        Select color
      </InputLabel>
      <Select
        labelId="color-select-label"
        id="color-select"
        value={selectedVariantColor.key}
        label="Select color"
        size="small"
        onChange={handleChangeColor}
      >
        {allVariants.map((variant) => {
          const variantColor = getVariantAttributeLocalizedEnumValue(variant, 'color', localization);

          return (
            <MenuItem key={variant.id} value={variantColor.key}>
              {variantColor.label[localization]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};