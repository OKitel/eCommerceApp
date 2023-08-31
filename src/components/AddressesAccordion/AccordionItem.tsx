import { AccordionDetails, Typography, IconButton, Chip, Switch, Tooltip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Address } from '@commercetools/platform-sdk';

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (address.id) {
      onDefaultChange(address.id, event.target.checked);
    }
  };
  return (
    <AccordionDetails className="address-item">
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
          <Switch checked={defaultId === address.id} onChange={handleChange} data-testid="default-switch" />
        </Tooltip>
        <IconButton onClick={onEditRequest} color="primary" className="edit-control" data-testid="edit-btn">
          <EditRoundedIcon />
        </IconButton>
        <IconButton onClick={onDeleteRequested} className="delete-control" color="error" data-testid="delete-btn">
          <DeleteRoundedIcon />
        </IconButton>
      </div>
    </AccordionDetails>
  );
};
