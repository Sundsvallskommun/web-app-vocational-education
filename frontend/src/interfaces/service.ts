export interface ServiceResponse<Data, Error = number | string | boolean> {
  data?: Data;
  error?: Error;
  message?: string;
}
