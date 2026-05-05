export default function Header() {
  return (
    <div>
      <div>오늘은 🗓️</div>
      <div>{new Date().toDateString()}</div>
    </div>
  );
}
