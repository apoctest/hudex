export default function Pagination({ totalPages, currentPage, currentPageRangeStart, currentPageRangeEnd, handlePageChange }) {
    return (
        <div>
            {totalPages === 1 ? null : (
                <div>
                    {currentPage > 1 && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className=""
                        >
                            Prev
                        </button>
                    )}
        
                    {Array.from({ length: currentPageRangeEnd - currentPageRangeStart + 1 }).map((_, index) => {
                        const page = currentPageRangeStart + index
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={currentPage === page ? "" : ""}
                            >
                                {page}
                            </button>
                        )
                    })}
        
                    {currentPage < totalPages && (
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            className=""
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}