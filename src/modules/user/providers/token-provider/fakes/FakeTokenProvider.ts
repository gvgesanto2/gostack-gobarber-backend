/* eslint-disable @typescript-eslint/ban-types */
import ITokenProvider from '../models/ITokenProvider';
import IGenerateTokenDTO from '../dtos/IGenerateTokenDTO';
import IVerifyTokenDTO from '../dtos/IVerifyTokenDTO';

class FakeTokenProvider implements ITokenProvider {
  public generateToken(tokenData: IGenerateTokenDTO): string {
    return JSON.stringify(tokenData);
  }

  public verifyToken({ token, secret }: IVerifyTokenDTO): string | object {
    const decoded = JSON.parse(token) as IGenerateTokenDTO;

    if (decoded.secret !== secret) {
      throw new Error();
    }

    return Object.assign(decoded.payload, { sub: decoded.options?.subject });
  }
}

export default FakeTokenProvider;
