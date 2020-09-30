import { compare, hash } from 'bcryptjs';

import ICompareHashDTO from '../dtos/ICompareDTO';
import ICryptoProvider from '../models/ICryptoProvider';

class BCryptCryptoProvider implements ICryptoProvider {
  public async encrypt(plainText: string): Promise<string> {
    return hash(plainText, 8);
  }

  public async compare({
    plainText,
    encrypted,
  }: ICompareHashDTO): Promise<boolean> {
    return compare(plainText, encrypted);
  }
}

export default BCryptCryptoProvider;
