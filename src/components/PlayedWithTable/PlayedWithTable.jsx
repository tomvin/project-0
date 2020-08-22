import { useTable, useSortBy } from 'react-table'
import React from 'react';
import './PlayedWithTable.scss';

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

const PlayedWithTable = ({ columns, data }) => {
    const {
        getTableProps,
        headerGroups,
        getTableBodyProps,
        rows,
        prepareRow,
      } = useTable(
        {
          columns,
          data,
        },
        useSortBy
      );
    return (
        <table className="table" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
                        <span className="sort-span">
                            {column.isSorted
                            ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                            : ''}
                        </span>
                        </th>
                    ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(
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
    );
};

export default PlayedWithTable;
