import React, {useMemo, useState} from 'react'
import {useTable, usePagination, useGlobalFilter} from 'react-table'
import { COLUMNS } from './columns'
import styles from '../styles/Table.module.css'
import {GlobalFilter} from './GlobalFilter'

function Table({products}) {
    const [featured, setFeatured] = useState(false)

    // Really inefficient + I would rather have it in getStaticProps in /Dashboard so it's only calculated on build
    // But for some reason it didn't want to work. That would make it a lot more performant
    const featuredProducts = products.filter(product => {
        return product["Is featured?"] === 1
    })

    const handleToggle = () => {
        setFeatured(!featured)
    }

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => featured ? featuredProducts: products, [featured])
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
        {
          columns,
          data,
        },
        useGlobalFilter,
        usePagination
      )
    
        const { globalFilter } = state
        const {pageIndex} = state
      return (
        <>
            <div className='flex flex-row mb-2'>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                <div className='ml-4 items-center'>
                    <input type="checkbox" name="name" id="id" onClick={handleToggle}/>
                    <label className='ml-2'>Featured Products</label>
                </div>
            </div>
          <table {...getTableProps()} className={styles.table}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className={styles.th}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} className={styles.tr}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()} className={styles.td}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className='w-full justify-between'>
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className='border border-blue-800 bg-blue-500 disabled:opacity-75 disabled:hover:bg-blue-500 hover:bg-blue-400 p-4 my-2 mr-2 text-white'>Previous</button>
              <button onClick={() => nextPage()} disabled={!canNextPage} className='border border-blue-800 bg-blue-500 disabled:opacity-75 disabled:hover:bg-blue-500 hover:bg-blue-400 p-4 my-2 text-white mr-[70%]'>Next</button>
              <span>
                  Page{" "}
                  <strong>{pageIndex+1} of {pageOptions.length}</strong>
              </span>
          </div>
        </>
    )
}

export default Table