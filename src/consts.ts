export const LIST_PAGE_LIMIT_DEFAULT = 20;

export const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export const PASSWORD_REGEXP =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&{}()\[\];'":])[A-Za-z\d@$!%*#?&:;(){}\[\]'"]{8,}$/;

export const PASSWORD_REGEXP_WITHOUT_SPECIALS = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const SEARCH_QUERY_PARAM = 'q';

export const countries = {
  US: 'USA',
  AT: 'Austria',
  DE: 'Germany',
  NL: 'Netherlands',
};
