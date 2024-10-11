export function convertTo24Hour(time) {
  if (time.includes("AM") || time.includes("PM")) {
    let [hoursMinutes, period] = time.split(" ");
    let [hours, minutes] = hoursMinutes.split(":");
    if (period === "PM" && parseInt(hours) < 12) {
      hours = String(parseInt(hours) + 12).padStart(2, "0");
    } else if (period === "AM" && parseInt(hours) === 12) {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  }
  return time;
}

export function convertTo12Hour(time) {
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = String(minutes).padStart(2, "0");
  return `${hours}:${minutes} ${ampm}`;
}

export const calculateDate = (createdAt) => {
  const createdDate = new Date(createdAt);
  const dd = String(createdDate.getDate()).padStart(2, "0");
  const mm = String(createdDate.getMonth() + 1).padStart(2, "0");
  const yyyy = createdDate.getFullYear();
  return `${dd} / ${mm} / ${yyyy}`;
};
