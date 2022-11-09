import React, { useState, useEffect, Children } from 'react'
import Paginator from './Paginator'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormCheck } from '@coreui/react'
import { connect } from 'react-redux'
import { select } from 'react-cookies'

export const Table = ({ params, count, columns, data, changeData, cookieName, style, emptyMessage, checkbox,onSelect }) => {
    const [selected, setSelected] = useState([])
    const onChange = e =>{
        if(e.target.checked) {
            setSelected(x => [...x, e.target.value])
        } else {
            setSelected(x => x.filter(w=> w !== e.target.value))
        }
    }
    const selectAll = (e) => {
        if(e.target.checked){
            setSelected(data.map(s=>s.id))
        } else {
            setSelected([])
        }
    }
    useEffect(()=>{
        checkbox&& onSelect(selected)
    },[selected])
    return (
        <>
            <CTable style={style} striped>
                <CTableHead>
                    <CTableRow>
                    {checkbox&&<CTableDataCell><CFormCheck onChange={selectAll}/></CTableDataCell>}
                        {Children.toArray(columns.map(({ header }) =>
                            <CTableHeaderCell scope="col">{header}</CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {Children.toArray(data.map(d =>

                        <CTableRow>
                            {checkbox&&<CTableDataCell><CFormCheck value={d.id} onChange={onChange} checked={selected.includes(d.id)}/></CTableDataCell>}
                            {Children.toArray(columns.map(({ field, body: Body }) => {
                                return Body ? <CTableDataCell><Body {...d} /></CTableDataCell> : <CTableDataCell>{d[field] ?? '-'}</CTableDataCell>
                            }))}
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            {data.length === 0 ? <span>{emptyMessage ?? `there's no data`}</span> :
                <Paginator params={params} count={count} changeData={changeData} cookieName={cookieName} />
            }

        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Table)