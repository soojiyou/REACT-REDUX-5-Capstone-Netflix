import React from "react";
import Pagination from "react-js-pagination";
import "../PaginationStyle.css"


const MyPagination = ({ activePage, totalItemsCount, onChange }) => {
    return (
        <div>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={5}
                onChange={onChange}
            />
        </div>
    );
};

export default MyPagination;
