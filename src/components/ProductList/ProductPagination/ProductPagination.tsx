import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useAppSelector } from '../../../store/hooks';
import { calculatePageNumber, calculatePagesTotal } from './utils';

type Props = {
  changePage: (pageNumber: number) => void;
};

export const ProductPagination: React.FC<Props> = ({ changePage }): JSX.Element | null => {
  const { pageInfo, progress } = useAppSelector((state) => state.productProjections);

  if (!pageInfo || (pageInfo && !pageInfo.total)) {
    return null;
  }

  const { total = 0, limit, offset } = pageInfo;
  const pagesTotal = calculatePagesTotal(total, limit);
  const pageNumber = calculatePageNumber(total, limit, offset);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number): void => {
    if (value !== pageNumber) {
      changePage(value);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination count={pagesTotal} page={pageNumber} disabled={progress} onChange={handleChange} size="large" />
    </Stack>
  );
};
