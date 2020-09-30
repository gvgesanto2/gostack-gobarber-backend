import { compare, hash } from 'bcryptjs';

import ICompareHashDTO from '../dtos/ICompareHashDTO';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash({
    payload,
    hashed,
  }: ICompareHashDTO): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
