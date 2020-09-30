import { container } from 'tsyringe';

import BCryptCryptoProvider from './implementations/BCryptCryptoProvider';
import ICryptoProvider from './models/ICryptoProvider';

const providers = {
  bcrypt: BCryptCryptoProvider,
};

container.registerSingleton<ICryptoProvider>('CryptoProvider', providers.bcrypt);
