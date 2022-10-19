import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { CButton, CModal, CModalHeader, CModalTitle, CModalFooter, CForm, CFormInput, CFormSelect, CRow, CCol } from '@coreui/react'
import { addAccountHandler, updateAccountHandler } from 'src/store/bankAccount'

export const AccountModal = ({ add, update ,addAccountHandler, updateAccountHandler ,account, onClose}) => {
    const { t: g } = useTranslation('translation', { keyPrefix: 'globals' })
    const { t } = useTranslation('translation', { keyPrefix: 'bankAccount' })
    const submitHandler = e => {
        e.preventDefault()
        let obj = { title: e.target.title.value, type: e.target.type.value, reference: e.target.referenceNumber.value }
        Promise.all([update ? updateAccountHandler({ ...obj, id: account.id }) : addAccountHandler(obj)]).then(onClose)
    }
    return (
        <CModal
            onClose={onClose}
            visible={add || update}
            alignment="center"
        >
            <CModalHeader>
                <CModalTitle >{t('transferAccount')}</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={submitHandler}>
                <CRow xs={{ gutterY: 3 }} className="mrgn50 justify-content-md-center">
                    <CCol xs={8}>

                        <CFormInput id='title' placeholder={t('title')} required defaultValue={account.title} />
                    </CCol>
                    <CCol xs={8}>
                        <CFormSelect id='type' required defaultValue={account.type}>
                            <option value='bank Account'>{t('bankAccount')}</option>
                            <option value='Cliq'>{t('cliq')}</option>
                            <option value='e-wallet'>{t('ewallet')}</option>
                        </CFormSelect>

                    </CCol>
                    <CCol xs={8}>
                        <CFormInput id='referenceNumber' placeholder={t('reference')} defaultValue={account.reference} required />
                    </CCol>

                </CRow>
                <CModalFooter>
                    <CButton color="secondary" type="button" onClick={onClose}>{g('close')}</CButton>
                    {update ? <CButton color="primary" type='submit'>{g('saveChanges')}</CButton> : <CButton color="primary" type='submit'>{g('add')}</CButton>}
                </CModalFooter>
            </CForm>
        </CModal>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {addAccountHandler, updateAccountHandler }

export default connect(mapStateToProps, mapDispatchToProps)(AccountModal)