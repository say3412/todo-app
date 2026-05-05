export default function TodoItem() {
  return (
    <div>
      <input type="checkbox" />
      <div>todo 111</div>
      <div>{new Date().toDateString()}</div>
      <button>🗑️</button>
    </div>
  );
}
