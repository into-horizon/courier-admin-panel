import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
import {
    DialogType,
    usePopup,
    ToastPosition,
} from 'react-custom-popup';
export const DeleteModal = ({ visible, onClose, onDelete, id }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'globals' });
    const { showToast } = usePopup();
    const deleteHandler = () => {
        Promise.all([onDelete({ id: id })]).then((e) => {
            showToast({
                text: t('successDelete'),
                type: DialogType.INFO,
                position: ToastPosition[t('ToastPosition')],
                timeoutDuration: 5000
            })
        }).catch(() => {            
            showToast({
                text: t('wentWrong'),
                type: DialogType.DANGER,
                position: ToastPosition[t('ToastPosition')],
                timeoutDuration: 5000
            })

        });
        onClose()
    }
    return (
        <div>
            <CModal
                onClose={onClose}
                visible={visible}
                alignment="center"
            >
                <CModalHeader>
                    {t('deleteTitle')}
                </CModalHeader>
                <CModalBody>
                   {t('deleteText')}
                </CModalBody>
                <CModalTitle>

                </CModalTitle>
                <CModalFooter>
                    <CButton onClick={deleteHandler} color='danger'>
                        {t('delete')}
                    </CButton>
                    <CButton color='secondary' onClick={onClose}>
                        {t('cancel')}
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)