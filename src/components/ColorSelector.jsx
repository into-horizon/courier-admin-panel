import React, { useEffect, useState } from 'react';
import colors from '../services/colors'
import {CFormSelect} from '@coreui/react'
import { useTranslation } from 'react-i18next';

const ColorSelector = props => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'colors' });
    const [color, setColor] = useState()
    let props2 = {...props}
    props2.onChange && delete props2.onChange
    const onChange = e => {
        setColor(e.target.value)
       props.onChange && props.onChange(e)
    }
    useEffect(() => setColor(props.value), [props.value])
    const secondaryColors = ['Black', 'Blue', 'Maroon', 'Navy']
    return (
        <CFormSelect style={{ backgroundColor: color, color: secondaryColors.includes(color)? 'White': 'Black' }} onChange={onChange} {...props2}  >
            {props.selectstatement && <option value='' disabled>select color</option>}
            {colors.map((color, i) => <option value={color} style={{ backgroundColor: color,color: secondaryColors.includes(color)? 'White': 'Black' }} key={`${i}color`} >{t(color)}</option>)}

        </CFormSelect>
    )
}

export default ColorSelector

