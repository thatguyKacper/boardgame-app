export default function Pagination({ children }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">{children}</ul>
    </nav>
  );
}
