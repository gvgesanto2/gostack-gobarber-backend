import ICompareDTO from '../dtos/ICompareDTO';
import ICryptoProvider from '../models/ICryptoProvider';

class FakeCryptoProvider implements ICryptoProvider {
  public async encrypt(plainText: string): Promise<string> {
    return plainText;
  }

  public async compare({
    plainText,
    encrypted,
  }: ICompareDTO): Promise<boolean> {
    return plainText === encrypted;
  }
}

export default FakeCryptoProvider;
