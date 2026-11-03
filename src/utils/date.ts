import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const DEFAULT_TIMEZONE = 'Asia/Kolkata';
export const DISPLAY_DATE_FORMAT = 'DD MMM YYYY';

export function formatDate(value: string | Date, tz = DEFAULT_TIMEZONE): string {
  return dayjs(value).tz(tz).format(DISPLAY_DATE_FORMAT);
}

export { dayjs };
