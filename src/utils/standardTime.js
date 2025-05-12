export default function standardTime(dateString) {
  const date = new Date(dateString);

  const padZero = (num) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // tháng bắt đầu từ 0
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}
