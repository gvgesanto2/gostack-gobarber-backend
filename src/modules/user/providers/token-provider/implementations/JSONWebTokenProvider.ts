/* eslint-disable @typescript-eslint/ban-types */
import { sign, verify } from 'jsonwebtoken';

import ITokenProvider from '../models/ITokenProvider';
import IGenerateTokenDTO from '../dtos/IGenerateTokenDTO';
import IVerifyTokenDTO from '../dtos/IVerifyTokenDTO';

class JSONWebTokenProvider implements ITokenProvider {
  public generateToken({
    payload,
    secret,
    options,
  }: IGenerateTokenDTO): string {
    const token = sign(payload, secret, options);

    return token;
  }

  public verifyToken({ token, secret }: IVerifyTokenDTO): string | object {
    const decoded = verify(token, secret);

    return decoded;
  }
}

export default JSONWebTokenProvider;
