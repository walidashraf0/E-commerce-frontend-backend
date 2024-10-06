import ReactPaginate from "react-paginate";
import "./Pagination.css";

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

export default function PaginatedItems({ itemsPerPage, data, setPage }) {
  const pageCount = data.length / itemsPerPage;
//   console.log(pageCount);
  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end flex-wrap"
        pageLinkClassName="pagination-tag-anchor mx-2 text-secondary rounded-circle"
        activeLinkClassName="bg-primary text-white"
      />
    </>
  );
}
