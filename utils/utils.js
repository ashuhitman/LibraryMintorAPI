// Function to get today's date in YYYY-MM-DD format
export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}
export function getCurrentTime(now) {
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
