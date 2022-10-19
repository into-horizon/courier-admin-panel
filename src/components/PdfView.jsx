import React from 'react';
import ReactPDF from '@react-pdf/renderer';

import Pdf from './Pdf';
import { connect } from 'react-redux'

ReactPDF.render(<Pdf />, `${__dirname}/example.pdf`);

// export const PdfView = (props) => {
//   return (
//     <div>PdfView</div>
//   )
// }

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(PdfView)

