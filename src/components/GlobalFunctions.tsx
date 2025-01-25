export function getDateDifference(date1: Date, date2: Date): string {
    const differenceInMilliseconds = date1.getTime() - date2.getTime();
  
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;
    const differenceInMonths = differenceInDays / 30;
    const differenceInYears = differenceInDays / 365;
  
    if (differenceInYears >= 1) {
      return `${Math.round(differenceInYears)} year${Math.round(differenceInDays) > 1 ? 's' : ''}`;
    } else if (differenceInMonths >= 1) {
      return `${Math.round(differenceInMonths)} month${Math.round(differenceInMonths) > 1 ? 's' : ''}`;
    } else if (differenceInDays >= 1) {
      return `${Math.round(differenceInDays)} day${Math.round(differenceInDays) > 1 ? 's' : ''}`;
    } else if (differenceInHours >= 1) {
      return `${Math.round(differenceInHours)} hour${Math.round(differenceInHours) > 1 ? 's' : ''}`;
    } else if (differenceInMinutes >= 1) {
      return `${Math.round(differenceInMinutes)} minute${Math.round(differenceInMinutes) > 1 ? 's' : ''}`;
    } else {
      return 'Less than a minute';
    }
}