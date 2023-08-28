import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper } from '@mui/material';

type Props = {
  setSearchQuery: (value: string) => void;
};

export const SearchBar: React.FC<Props> = ({ setSearchQuery }: Props): React.ReactElement => {
  const [query, setQuery] = useState('');
  return (
    <Paper sx={{ display: 'flex', maxWidth: '40rem', flexGrow: 1 }}>
      <InputBase
        sx={{ ml: 1, flexGrow: 1 }}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        value={query}
        onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
          if (e.key === 'Enter') {
            setSearchQuery(query);
          }
        }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(): void => setSearchQuery(query)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
