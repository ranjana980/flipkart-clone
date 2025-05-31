import React, { useState } from 'react';
import './table.scss';
import { TablePagination } from '@material-ui/core';

const CommonTable = ({ columns, data, sortable = false }) => {
    const [sortConfig, setSortConfig] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowPerPage] = useState(10);

    const sortedData = React.useMemo(() => {
        if (!sortable || !sortConfig) return data;

        const sorted = [...data];
        sorted.sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [data, sortConfig, sortable]);

    const handleSort = (key) => {
        if (!sortable) return;

        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const paginatedData = sortedData?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <div>
            <div className='h-[490px] scroll-style overflow-y-scroll mt-[45px]'>
                <table className="common-table ">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            {columns.map((col) => (
                                <th
                                    key={col.accessor}
                                    onClick={() => handleSort(col.accessor)}
                                    style={{ cursor: sortable ? 'pointer' : 'default' }}
                                >
                                    {col.header}
                                    {sortable && sortConfig?.key === col.accessor && (
                                        <span>{sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'}</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((row, idx) => (
                            <tr key={idx}>
                                <td>{page * rowsPerPage + idx + 1}</td>
                                {columns.map((col) => (
                                    <td key={col.accessor}>{row[col.accessor]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='mb-5'>
                <TablePagination
                    onRowsPerPageChange={(e) => {
                        setRowPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    onPageChange={(e, newPage) => {
                        setPage(newPage);
                    }}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    count={data?.length || 0}
                    component="div"
                />
            </div>
        </div>
    );
};

export default CommonTable;
