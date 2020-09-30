import { container } from 'tsyringe';

import BCryptHashProvider from './implementations/BCryptHashProvider';
import IHashProvider from './models/IHashProvider';

const providers = {
  bcrypt: BCryptHashProvider,
};

container.registerSingleton<IHashProvider>('HashProvider', providers.bcrypt);
