import React, { useState, useEffect } from 'react';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import ProductsRender from 'src/components/ProductsRender';
import cookie from 'react-cookies'
import { useTranslation } from 'react-i18next';

const Products = props => {
    const [activeKey, setActiveKey] = useState(cookie.load('status') || 'approved')
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'addProduct' });


    const changeStatus = (e,status) =>{
        e.preventDefault();
        setActiveKey(status)
        cookie.save('status', status)
    }
    return (
        <div className="products">
            <h2>{t('yourProducts')}</h2>
            <hr />
            <CNav variant="pills" role="tablist">
                <CNavItem>
                    <CNavLink
                        href=""
                        active={activeKey === 'approved'}
                        onClick={(e) => changeStatus(e, 'approved')}
                    >
                      {t('approved')}
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        href=""
                        active={activeKey === 'pending'}
                        onClick={(e) => changeStatus(e, 'pending')}
                    >
                         {t('pending')}
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        href=""
                        active={activeKey === 'rejected'}
                        onClick={(e) => changeStatus(e, 'rejected')}
                    >
                          {t('rejected')}
                    </CNavLink>
                </CNavItem>
            </CNav>
            <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 'approved'}>
                {activeKey === 'approved'? <ProductsRender status= {activeKey}/>: null}
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 'pending'}>
                {activeKey === 'pending'? <ProductsRender status= {activeKey}/>: null}
                </CTabPane>
                <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 'rejected'}>
                {activeKey === 'rejected'? <ProductsRender status= {activeKey}/>: null}
                </CTabPane>
            </CTabContent>
        </div>
    )
}

export default Products