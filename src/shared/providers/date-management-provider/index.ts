import { container } from 'tsyringe';

import FnsDateManagementProvider from './implementations/FnsDateManagementProvider';
import IDateManagementProvider from './models/IDateManagementProvider';

const providers = {
  fns: FnsDateManagementProvider,
};

container.registerSingleton<IDateManagementProvider>(
  'DateManagementProvider',
  providers.fns,
);
