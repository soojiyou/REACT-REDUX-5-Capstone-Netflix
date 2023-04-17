import React from "react";
import Pagination from "react-js-pagination";
import "../style/PaginationStyle.css"



const MyPagination = ({ activePage, totalItemsCount, onChange }) => {
    const isSmallScreen = window.innerWidth < 500;
    return (
        <div>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={isSmallScreen ? 3 : 5}
                onChange={onChange}
            />
        </div>
    );
};

export default MyPagination;
