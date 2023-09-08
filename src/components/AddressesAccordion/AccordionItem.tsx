import {
  AccordionDetails,
  Typography,
  IconButton,
  Chip,
  Switch,
  Tooltip,
  AccordionSummary,
  Accordion,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Address } from '@commercetools/platform-sdk';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useState } from 'react';

import { getCountryByCode } from '../../utils/typesUtils';

type Props = {
  defaultId: string;
  address: Address;
  onDeleteRequested: () => void;
  onDefaultChange: (id: string, isDefault: boolean) => void;
  onEditRequest: () => void;
};

export const AccordionItem: React.FC<Props> = ({
  defaultId,
  address,
  onDeleteRequested,
  onDefaultChange,
  onEditRequest,
}: Props): React.ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (address.id) {
      onDefaultChange(address.id, event.target.checked);
    }
  };

  const stopPropagation = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  const handleEditClick = (event: React.MouseEvent<HTMLElement>): void => {
    stopPropagation(event);
    onEditRequest();
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLElement>): void => {
    stopPropagation(event);
    onDeleteRequested();
  };

  return (
    <AccordionDetails className="address-item">
      <Accordion expanded={expanded} onChange={(): void => setExpanded(!expanded)} sx={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="address-summary"
        >
          <div className="address-title">
            <Typography>{address.streetName}</Typography>
            {defaultId === address.id && (
              <Chip
                icon={<HomeRoundedIcon />}
                label="Default"
                color="primary"
                size="small"
                variant="outlined"
                data-testid="chip-default-address"
              />
            )}
          </div>
          <div className="address-controls">
            <Tooltip title="Set as default" placement="top">
              <Switch
                checked={defaultId === address.id}
                onChange={handleChange}
                onClick={stopPropagation}
                data-testid="default-switch"
              />
            </Tooltip>
            <IconButton onClick={handleEditClick} color="primary" className="edit-control" data-testid="edit-btn">
              <EditRoundedIcon />
            </IconButton>
            <IconButton onClick={handleDeleteClick} className="delete-control" color="error" data-testid="delete-btn">
              <DeleteRoundedIcon />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails className="address-item">
          {(address.firstName || address.lastName) && (
            <Typography>
              {address.firstName} {address.lastName}
            </Typography>
          )}
          <Typography>Street: {address.streetName}</Typography>
          <Typography>City: {address.city}</Typography>
          <Typography>Country: {getCountryByCode(address.country)}</Typography>
          <Typography>Postal Code: {address.postalCode}</Typography>
        </AccordionDetails>
      </Accordion>
    </AccordionDetails>
  );
};
