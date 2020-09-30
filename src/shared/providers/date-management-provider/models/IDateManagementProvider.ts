export default interface IDateManagementProvider {
  startOfHour(date: Date | number): Date;
  parseISO(stringfiedDate: string): Date;
}
