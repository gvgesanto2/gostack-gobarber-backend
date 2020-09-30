/* eslint-disable @typescript-eslint/ban-types */
export default interface IGenerateTokenDTO {
  payload: object;
  secret: string;
  options?: {
    subject?: string;
    expiresIn?: string;
  };
}
