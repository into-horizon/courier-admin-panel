import React, { useState, useEffect } from 'react';
import {updateAddress,removeAddress} from '../../../store/address'
import {connect} from 'react-redux'
import {CCard,CButton,CCardHeader,CCardTitle,CCardText,CCardBody} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import {
    AnimationType,
    DialogType,
    OutAnimationType,
    PopupProvider,
    usePopup,
    ToastPosition,
  } from 'react-custom-popup';

  const buttonStyles = {
    display: 'block',
    marginTop: 5,
  };



const ViewAddress = ({ address,updateAddress,removeAddress }) => {
    const { showAlert, showOptionDialog, showInputDialog, showToast } = usePopup();
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'account.addressDetails' });
    const [updateMode, setUpdateMode] = useState(false)
const removeHandler = (id) =>{
  showOptionDialog({
    containerStyle: { width: 350 },
    text: t("deleteText"),
    title: t('deleteTitle'),
    options: [
      {
        name: t('cancel'),
        type: 'cancel',
      },
      {
        name: t('delete'),
        type: 'confirm',
        style: { background: 'lightcoral' },
      },
    ],
    onConfirm: () =>{
      removeAddress(id)
      showToast({
        type: DialogType.SUCCESS,
        text: t('successDelete'),
        timeoutDuration: 3000,
        showProgress: true,
      })

    },
  })
}
    const updateAddressHandler = () => {
      showInputDialog({
        showCloseButton: true,
            headerTextStyle: { fontWeight: 'bold', fontSize: 'x-large' },
            headerStyle: { marginTop: 5, marginBottom: 5 },
            errorMessageStyle: { color: 'green' },
            options: [
              
              {
                name: t('confirm'),
                type: 'confirm',
                style: { background: 'lightgreen' },
              },
              {
                name: t('cancel'),
                type: 'cancel',
                style: { background: 'lightcoral' },
              },
            ],
            inputs: [
              {
                inputType: 'text',
                name: 'first_name',
                label: t('firstName'),
                default: address.first_name,
                validation: {
                  minLength: {
                    value: 5,
                  },
                },
              },
              {
                inputType: 'text',
                name: 'last_name',
                label: t('lastName'),
                default: address.last_name,
                validation: {
                  required: { value: true, message: 'Value is required' },
                },
              },
              {
                inputType: 'text',
                name: 'city',
                label: t('city'),
                default: address.city,
                validation: { required: { value: true } },
              },
              {
                inputType: 'text',
                name: 'region',
                label: t('region'),
                default: address.region,
                validation: { required: { value: true } },
              },
              {
                inputType: 'text',
                name: 'street_name',
                label: t('street'),
                default: address.street_name,
                validation: { required: { value: true } },
              },
              {
                inputType: 'text',
                name: 'building_number',
                label: t('building'),
                default: address.building_number,
                
              },
              {
                inputType: 'text',
                name: 'apartment_number',
                label: t('apartment'),
                default: address.apartment_number,
                
              },
              
            ],
            onConfirm: (response) => {
              updateAddress({...address,...response})
              showAlert({ title: 'Result', text: JSON.stringify(response) });
            },
          })
          setTimeout(() => setUpdateMode(!updateMode), 10)
    }
    useEffect(() => {
      let labels = document.querySelectorAll('label');
          labels.forEach((label) => label.setAttribute('class', `no${i18n.language}`)  )
        },[i18n.language,updateMode])
    return (
      <>
            <CCard  style={{ margin: '1rem 0' }}>
                <CCardHeader>{address.storeName}</CCardHeader>
                <CCardBody>
                    <CCardTitle>{`${address.first_name} ${address.last_name}`}</CCardTitle>
                    <CCardText>{`${address.city} - ${address.region} - ${address.street_name}`}{ address.building_number && `- building:${address.building_number}`}{address.apartment_number && `- apartment:${address.apartment_number}`}</CCardText>
                    <CButton onClick={() =>updateAddressHandler()}>{t('update')}</CButton>
                   {' '} {' '}
                    <CButton color='danger' onClick={() =>removeHandler(address.id)}>{t('delete')}</CButton>
                </CCardBody>
            </CCard>
        </>
    )
}

const mapStateToProps = (state) => ({

})
const mapDispatchToProps = {updateAddress,removeAddress}
export default connect(mapStateToProps,mapDispatchToProps)(ViewAddress);