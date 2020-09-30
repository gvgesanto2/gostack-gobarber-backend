import { container } from 'tsyringe';

import JSONWebTokenProvider from './implementations/JSONWebTokenProvider';
import ITokenProvider from './models/ITokenProvider';

const providers = {
  jwt: JSONWebTokenProvider,
};

container.registerSingleton<ITokenProvider>('TokenProvider', providers.jwt);
