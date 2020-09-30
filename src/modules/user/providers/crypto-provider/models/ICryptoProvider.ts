import ICompareDTO from '../dtos/ICompareDTO';

export default interface ICryptoProvider {
  encrypt(plainText: string): Promise<string>;
  compare(data: ICompareDTO): Promise<boolean>;
}
