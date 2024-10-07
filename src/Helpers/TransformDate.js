export default function TransformDate(date) {
  const selectedDate = new window.Date(date);
  const getFullYear = selectedDate.getFullYear();
  const getMonth = selectedDate.getMonth();
  const getDay = selectedDate.getDay();
  console.log(getFullYear);
  console.log(getMonth);
  console.log(getDay);
}
