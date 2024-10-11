export default function CustomPaginationNumbers({
  currentPage: page,
  lastPage: max,
  param,
  setSearchParams,
}) {
  function handleSetParams(event, n) {
    event.preventDefault();
    const updatedParams = new URLSearchParams(window.location.search);
    updatedParams.set(param, n);
    setSearchParams(updatedParams);
  }

  return (
    <div className={`numbers ${+max <= 4 && "mini"}`}>
      {+max <= 4 ? (
        <>
          {Array(max)
            .fill(0)
            .map((_, i) => (
              <button
                className={+page === i + 1 ? "active" : ""}
                key={i}
                onClick={(event) => handleSetParams(event, i + 1)}
              >
                {i + 1}
              </button>
            ))}
        </>
      ) : (
        <>
          {+page >= 3 && (
            <>
              <button
                className={+page === 1 ? "active" : ""}
                onClick={(event) => handleSetParams(event, 1)}
              >
                1
              </button>
              <Ellipsis />
            </>
          )}
          {+page >= +max - 1 && (
            <button onClick={(event) => handleSetParams(event, +max - 2)}>
              {+max - 2}
            </button>
          )}
          {+page === +max && (
            <button onClick={(event) => handleSetParams(event, +page - 1)}>
              {+page - 1}
            </button>
          )}
          {+page <= 2 && (
            <button
              className={+page === 1 ? "active" : ""}
              onClick={(event) => handleSetParams(event, 1)}
            >
              1
            </button>
          )}
          {+page !== 1 && (
            <button
              className={"active"}
              onClick={(event) => handleSetParams(event, +page)}
            >
              {+page}
            </button>
          )}
          {+page !== +max && (
            <button onClick={(event) => handleSetParams(event, +page + 1)}>
              {+page + 1}
            </button>
          )}
          {+page === 1 && (
            <button onClick={(event) => handleSetParams(event, +page + 2)}>
              {+page + 2}
            </button>
          )}
          {+page <= +max - 3 && (
            <>
              <Ellipsis />
              <button onClick={(event) => handleSetParams(event, max)}>
                {max}
              </button>
            </>
          )}
          {+page === +max - 2 && (
            <button onClick={(event) => handleSetParams(event, max)}>
              {max}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function Ellipsis() {
  return <span>...</span>;
}
