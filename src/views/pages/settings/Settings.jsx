import React, { useState, useEffect } from 'react'
import {CNav,CNavItem ,CNavLink} from '@coreui/react'
import Account from '../../../components/Account'
import Address from '../address/Address'
import { useTranslation } from 'react-i18next';
import BankAccount from 'src/components/BankAccount';

const Settings = props => {
    const [activeKey, setActiveKey] = useState('settings')
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'account' });
    const changeStatus = (e,status) =>{
        e.preventDefault();
        setActiveKey(status)
      
    }
    return (
        <>
            <CNav variant="pills">
                <CNavItem>
                    <CNavLink href="#" active={activeKey === 'settings'} onClick={() => setActiveKey('settings')}>
                        {t('settings')}
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="#" active={activeKey === 'address'} onClick={() => setActiveKey('address')}>{t('address')}</CNavLink >
                </CNavItem>
                {/* <CNavItem>
                    <CNavLink href="#" active={}>Link</CNavLink>
                </CNavItem> */}
                <CNavItem>
                    <CNavLink href="#" active={activeKey === 'payment'}  onClick={() => setActiveKey('payment')}>
                       {t('payment')}
                    </CNavLink>
                </CNavItem>
            </CNav>
                {activeKey === 'settings' && <Account/>}
                {activeKey === 'address' && <Address/>}
                {activeKey === 'payment' && <BankAccount/>}
        </>
    )
}

export default Settings