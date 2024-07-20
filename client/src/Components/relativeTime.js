import { formatDistanceToNow } from 'date-fns';

export function getRelativeTime(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
