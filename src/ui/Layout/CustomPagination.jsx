import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomPaginationNumbers from "./CustomPaginationNumbers";

export default function CustomPagination({
  pageSize,
  className,
  count,
  param = "page",
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastPage = Math.ceil(count / (pageSize || 12));
  const currentPage = parseInt(searchParams.get(param)) || 1;
  const lang = useSelector((state) => state.language.lang);

  const atStart = currentPage <= 1;
  const atEnd = currentPage >= lastPage;

  function updatePage(newPage) {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(param, newPage);
    setSearchParams(updatedParams);
  }

  function handlePrev(event) {
    event.preventDefault();
    if (!atStart) {
      updatePage(currentPage - 1);
    }
  }

  function handleNext(event) {
    event.preventDefault();
    if (!atEnd) {
      updatePage(currentPage + 1);
    }
  }

  function handleFirstPage(event) {
    event.preventDefault();
    updatePage(1);
  }

  function handleLastPage(event) {
    event.preventDefault();
    updatePage(lastPage);
  }

  return (
    <div className={`pagination_component mt-4 ${className}`}>
      <div
        className={`paginator_btns d-flex align-items-center gap-1 ${
          lang === "en" ? "rotate" : ""
        }`}
      >
        <button onClick={handleFirstPage} className={atStart ? "disabled" : ""}>
          <i className="fa-regular fa-angles-right"></i>
        </button>
        <button onClick={handlePrev} className={atStart ? "disabled" : ""}>
          <i className="fa-regular fa-angle-right"></i>
        </button>
      </div>
      <CustomPaginationNumbers
        currentPage={currentPage}
        lastPage={lastPage}
        param={param}
        setSearchParams={setSearchParams}
      />
      <div
        className={`paginator_btns d-flex align-items-center gap-1 ${
          lang === "en" ? "rotate" : ""
        }`}
      >
        <button onClick={handleNext} className={atEnd ? "disabled" : ""}>
          <i className="fa-regular fa-angle-left"></i>
        </button>
        <button onClick={handleLastPage} className={atEnd ? "disabled" : ""}>
          <i className="fa-regular fa-angles-left"></i>
        </button>
      </div>
    </div>
  );
}
