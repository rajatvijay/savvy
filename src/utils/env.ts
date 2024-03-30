import { SAVVY_ENV_PROD } from "./constants";

export const isProdEnv = () =>
  process.env.NEXT_PUBLIC_SAVVY_ENV === SAVVY_ENV_PROD;
