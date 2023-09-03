import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { AttributeBooleanType } from '@commercetools/platform-sdk';

import { useAppSelector } from '../../../../store/hooks';
import { AttributeDefinitionWithType, TFilterAttributes } from '../types';

type Props = {
  attributes: AttributeDefinitionWithType<AttributeBooleanType>[];
  filterAttributes: TFilterAttributes;
  setFilterAttributes: React.Dispatch<React.SetStateAction<TFilterAttributes>>;
};

export const BooleanFilterAttributes: React.FC<Props> = ({
  attributes,
  filterAttributes,
  setFilterAttributes,
}): JSX.Element[] => {
  const { localization } = useAppSelector((state) => state.settings);

  const handleChangeFilterCheckboxAttribute = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;

    setFilterAttributes({
      ...filterAttributes,
      [name]: checked || undefined,
    });
  };

  return attributes.map((attribute) => (
    <Stack key={attribute.name} direction="row" alignItems="center" gap={0.5}>
      <FormGroup>
        <FormControlLabel
          sx={{ marginLeft: 0 }}
          name={attribute.name}
          control={
            <Checkbox
              sx={{ marginRight: 0.5 }}
              name={attribute.name}
              icon={<MusicNoteOutlinedIcon />}
              checkedIcon={<MusicNoteIcon />}
              checked={!!filterAttributes[attribute.name]}
              onChange={handleChangeFilterCheckboxAttribute}
            />
          }
          label={`${attribute.label[localization]} only`}
        />
      </FormGroup>
    </Stack>
  ));
};
