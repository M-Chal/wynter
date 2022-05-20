import React, {useMemo, useState} from 'react'
import {useTable, useFilters, useGlobalFilter} from 'react-table'
import { COLUMNS } from './columns'
import styles from '../styles/Table.module.css'
import {GlobalFilter} from './GlobalFilter'

function Table({products}) {
    const [featured, setFeatured] = useState(false)

    // Really inefficient
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
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
        {
          columns,
          data,
        },
        useGlobalFilter
      )
    
      const { globalFilter } = state
    
      return (
        <>
            <div>
                <input type="checkbox" name="name" id="id" onClick={handleToggle}/>
                <label>Featured Products</label>
            </div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
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
              {rows.map(row => {
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
        </>
    )
}

export default Table