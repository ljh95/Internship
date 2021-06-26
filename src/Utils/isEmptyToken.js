export default function isEmptyToken() {
  return (
    localStorage.getItem('token') != null &&
    !localStorage.getItem('token').length
  );
}
