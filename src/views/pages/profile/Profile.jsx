import React from 'react'
import ProfileInfo from 'src/components/StoreInformation'
import StorePicture from 'src/components/StorePicture'
import { useTranslation } from 'react-i18next';

const Profile = props =>{
    
    return (
        <>
        <StorePicture/>
        <ProfileInfo/>
        </>
    )
}

export default Profile