import React, { useState, useEffect } from 'react';
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons';
import { CButton, CForm, CFormInput, CCol, CRow, CContainer } from '@coreui/react'
import { addAddress } from '../../../store/address'
import { connect } from 'react-redux'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useTranslation } from 'react-i18next';

const NewAddress = ({ addAddress }) => {
    const [add, setAdd] = useState(false)
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'account.addressDetails' });

    const submitHandler = e => {
        e.preventDefault()
        let obj = {
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            city: e.target.city.value,
            street_name: e.target.street.value,
            building_number: e.target.building.value,
            apartment_number: e.target.apartment.value,
            mobile: e.target.mobile.value,
            country: e.target.country.value,
            region: e.target.region.value,
            store_address: true,
        }
        addAddress(obj)
    }

    return (
        <>
            {!add ? <>
                <CIcon icon={cilPlus} size="sm" />
                <CButton color="link" onClick={() => setAdd(true)}>{t('add')}</CButton>

            </> :
                <CForm onSubmit={submitHandler} style={{ margin: '1rem 0' }} >
                    <CContainer>
                        <CRow>
                            <CCol sm="auto">
                                <CFormInput
                                    type="text"
                                    name='first_name'
                                    id="firstName"
                                    label="first name"
                                    placeholder={t('firstName')}
                                    text="Must be 8-20 characters long."
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    autoComplete="given-name"
                                    required
                                />
                                <CFormInput
                                    type="text"
                                    name='last_name'
                                    id="lastName"
                                    label="last name"
                                    placeholder={t("lastName")}
                                    text="Must be 8-20 characters long."
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    autoComplete="family-name"
                                    required
                                />
                            </CCol>
                            <CCol sm="auto">
                                <CFormInput
                                    type="city"
                                    name='city'
                                    id="city"
                                    label="City"
                                    placeholder={t("city")}
                                    text="Must be 8-20 characters long."
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    autoComplete="home city"
                                    required
                                />
                                <CFormInput
                                    type="test"
                                    id="region"
                                    label="region"
                                    placeholder={t("region")}
                                    text="Must be 8-20 characters long."
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    autoComplete="address-level3"

                                />


                            </CCol>

                            <CCol sm="auto">
                                <CFormInput
                                    type="text"
                                    name='street-address'
                                    id="street"
                                    label="street name"
                                    placeholder={t("street")}

                                    aria-describedby="exampleFormControlInputHelpInline"
                                    autoComplete="street-address"
                                    required
                                />
                                <CFormInput
                                    type="text"

                                    id="building"
                                    label="Building Number/Name"
                                    placeholder={t("building")}

                                    aria-describedby="exampleFormControlInputHelpInline"


                                />

                            </CCol>
                            <CCol sm="auto">
                                <CFormInput
                                    type="text"

                                    id="apartment"
                                    label="apartment number"
                                    placeholder={t("apartment")}

                                    aria-describedby="exampleFormControlInputHelpInline"


                                />
                                <CFormInput
                                    type="text"
                                    name='phone'
                                    id="mobile"
                                    label="mobile"
                                    placeholder={t("mobile")}
                                    text="Must be 8-20 characters long."
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    autoComplete="tel"
                                    required
                                />

                                <CFormInput
                                    type="hidden"
                                    id="country"
                                    label="Country"
                                    placeholder="country"
                                    text="Must be 8-20 characters long."
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    autoComplete="country_name"
                                    defaultValue='jordan'
                                />

                            </CCol>


                        </CRow>
                        <CButton color="primary" style={{ margin: '1rem 0' }} type='submit'>{t('submit')}</CButton>
                        <CButton color="danger" style={{ margin: '1rem' }} type='button' onClick={() => setAdd(false)}>{t('cancel')}</CButton>
                    </CContainer>
                </CForm>}
        </>
    )
}
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = { addAddress }

export default connect(mapStateToProps, mapDispatchToProps)(NewAddress);