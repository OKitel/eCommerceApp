export type TIntrospectResponse =
  | {
      active: true;
    }
  | {
      active: false;
      scope: string;
      exp: Date;
      client_id: string;
    };
