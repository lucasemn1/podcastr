import { AxiosResponse } from "axios";

export default interface ServiceResponse<T> {
  status: boolean;
  data: T;
  response: AxiosResponse;
}
