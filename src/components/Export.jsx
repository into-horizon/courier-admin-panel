import { CButton } from '@coreui/react'
import React from 'react'
import * as XLSX from 'xlsx';
import  CIcon  from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';

const Export = ({title, data, fileName, sheetName, style}) =>{
    const exportExcelHandler = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, sheetName?? 'sheet1')
        XLSX.writeFile(wb, `${fileName}.xlsx`)
    
    }
  return (
    <CButton onClick={exportExcelHandler} color="secondary" style={style}><CIcon icon={cilCloudDownload} size="lg" />{title}</CButton>
    
  )
}

export default Export