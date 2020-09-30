/* eslint-disable @typescript-eslint/ban-types */
import IGenerateTokenDTO from '../dtos/IGenerateTokenDTO';
import IVerifyTokenDTO from '../dtos/IVerifyTokenDTO';

export default interface ITokenProvider {
  generateToken(data: IGenerateTokenDTO): string;
  verifyToken(data: IVerifyTokenDTO): string | object;
}
