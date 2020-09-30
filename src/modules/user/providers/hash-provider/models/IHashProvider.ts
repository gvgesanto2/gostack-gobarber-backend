import ICompareHashDTO from '../dtos/ICompareHashDTO';

export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(data: ICompareHashDTO): Promise<boolean>;
}
