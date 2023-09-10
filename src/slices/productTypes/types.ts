import { TProductTypes } from '../../types';

export type TProductTypesSliceState = {
  types: TProductTypes;
  progress: boolean;
  errorMessage: string | null;
};
