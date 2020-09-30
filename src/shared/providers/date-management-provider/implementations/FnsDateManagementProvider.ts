import { parseISO, startOfHour } from 'date-fns';

import IDateManagementProvider from '../models/IDateManagementProvider';

class FnsDateManagementProvider implements IDateManagementProvider {
  public startOfHour(date: Date | number): Date {
    return startOfHour(date);
  }

  public parseISO(stringfiedDate: string): Date {
    return parseISO(stringfiedDate);
  }
}

export default FnsDateManagementProvider;
