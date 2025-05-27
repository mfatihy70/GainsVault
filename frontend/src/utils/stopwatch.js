
export function formatDateTime(ms) {
  if (ms === 0) return "00:00:00"; // Handle case when no time is set
  const date = new Date(ms);
  return date.toTimeString().split(' ')[0]; // "HH:MM:SS"
}
export function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
export function fromatToDateString(ms) {
  if (ms === 0) return "Today"; // Handle case when no time is set

  const inputDate = new Date(ms);
  const today = new Date();
  // Check if the input date is today (year, month, day all match)
  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();

  if (isToday) return "Today";

  const date = new Date(ms);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
  });
}
