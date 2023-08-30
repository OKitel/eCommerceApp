import { AccordionDetails, Typography, IconButton, Chip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Address } from '@commercetools/platform-sdk';

type Props = {
  defaultId: string;
  address: Address;
};

export const AccordionItem: React.FC<Props> = ({ defaultId, address }: Props): React.ReactElement => {
  return (
    <AccordionDetails className="address-item">
      <div className="address-title">
        <Typography>{address.streetName}</Typography>
        {defaultId === address.id && (
          <Chip icon={<HomeRoundedIcon />} label="Default" color="primary" size="small" variant="outlined" />
        )}
      </div>
      <div className="address-controls">
        <IconButton onClick={(): void => console.log('edit mode true')} color="primary" className="edit-control">
          <EditRoundedIcon />
        </IconButton>
        <IconButton onClick={(): void => console.log('delete address')} className="delete-control" color="error">
          <DeleteRoundedIcon />
        </IconButton>
      </div>
    </AccordionDetails>
  );
};
