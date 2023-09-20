import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AttributeLocalizedEnumType } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../../../store/hooks';
import { TFilterAttributes } from '../../types';
import { AttributeDefinitionWithType } from '../types';

type Props = {
  attributes: AttributeDefinitionWithType<AttributeLocalizedEnumType>[];
  filterAttributes: TFilterAttributes;
  onChange: (event: SelectChangeEvent) => void;
  resetFilterAttribute: (attributeName: string) => void;
};

export const LenumFilterAttributes: React.FC<Props> = ({
  attributes,
  filterAttributes,
  onChange,
  resetFilterAttribute,
}): JSX.Element[] => {
  const { localization } = useAppSelector((state) => state.settings);

  return attributes.map((attribute) => (
    <Stack key={attribute.name} direction="row" alignItems="center" gap={0.5}>
      <FormControl fullWidth>
        <InputLabel size="small" id={`filter-${attribute.name}-select-label`}>
          {attribute.label[localization]}
        </InputLabel>
        <Select
          labelId={`filter-${attribute.name}-select-label`}
          id={`filter-${attribute.name}-select`}
          name={attribute.name}
          value={String(filterAttributes[attribute.name] || '')}
          label={attribute.label[localization]}
          size="small"
          onChange={onChange}
        >
          {attribute.type.values.map((typeValue) => (
            <MenuItem key={typeValue.key} value={typeValue.key}>
              {typeValue.label[localization]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        color="error"
        disabled={!filterAttributes[attribute.name]}
        onClick={(): void => resetFilterAttribute(attribute.name)}
        aria-label="reset-button"
      >
        <CloseRoundedIcon />
      </IconButton>
    </Stack>
  ));
};
