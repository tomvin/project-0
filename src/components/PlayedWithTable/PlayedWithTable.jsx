import { useTable, useSortBy, usePagination } from 'react-table'
import React from 'react';
import './PlayedWithTable.scss';

const ROWS_PER_PAGE = 20;

const getCellClass = ({ column }) => {
    switch (column.id) {
        case 'wins':
        case 'losses':
        case 'games':
        case 'winrate':
            return 'align-right';
        default:
            return '';
    };
}

const getCellSuffix = ({ column }) => {
    switch (column.id) {
        case 'winrate':
            return '%';
        default:
            return '';
    }
}

const Paging = ({ canNextPage, canPreviousPage, nextPage, previousPage, pageCount, pageIndex }) => {

    return (
        <div className="paging-wrapper">
            <button className="paging-button" disabled={!canPreviousPage} onClick={previousPage}>Previous</button>
            <span className="paging-count">{pageIndex+1}/{pageCount}</span>
            <button className="paging-button" disabled={!canNextPage} onClick={nextPage}>Next</button>
        </div>
    )
};

const PlayedWithTable = ({ columns, data }) => {
    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        nextPage,
        previousPage,
        state: { pageIndex, pageSize }
      } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0, pageSize: ROWS_PER_PAGE }
        },
        useSortBy,
        usePagination
      );
    return (
        <div className="wrapper">
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            <span>{column.render('Header')}</span>
                            {/* Add a sort direction indicator */}
                            <span className={`sort-span ${!column.isSorted ? 'sort-span--hide' : ''}`}>
                                {column.isSorted
                                ? column.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                : ' 🔽'}
                            </span>
                            </th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        
                                        return (
                                        <td className={getCellClass(cell)} {...cell.getCellProps()}>{cell.render('Cell')}{getCellSuffix(cell)}</td>
                                        )
                                    })}
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
            <Paging {...{ canNextPage, canPreviousPage, nextPage, previousPage, pageCount, pageIndex }} />
        </div>
    );
};

export default PlayedWithTable;
