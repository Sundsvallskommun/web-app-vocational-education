export interface ServiceResponse<Data, Error = number | string | boolean | null> {
  data?: Data;
  error?: Error;
  message?: string;
}
