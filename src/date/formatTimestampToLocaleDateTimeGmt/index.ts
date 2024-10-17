export function formatTimestampToLocaleDateTimeGmt(timestamp: number): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: 'long',
    timeZone: 'UTC',
    timeZoneName: 'short',
    weekday: 'long',
    year: 'numeric',
  };

  let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

  // Replace 'UTC' with 'GMT'
  formattedDate = formattedDate.replace('UTC', 'GMT');

  // Insert a comma after the weekday
  formattedDate = formattedDate.replace(/^(\w+)(\s)/, '$1,$2');

  // Handle '24:00' issue by replacing with '00:00'
  formattedDate = formattedDate.replace('24:00', '00:00');

  return formattedDate;
}
