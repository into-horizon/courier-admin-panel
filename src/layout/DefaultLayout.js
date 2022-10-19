import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = (props) => {
  const {login} = props
  const history = useNavigate()
  // useEffect(() => {
  //   if(!login.loggedIn){
  //     history.push('/login')
  //   }
  // },[])
  // useEffect(() => {
  //   if(!login.loggedIn){
  //     history.push('/login')
  //   }
  // },[login.loggedIn])


  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  login: state.login

});

export default connect(mapStateToProps)(DefaultLayout)
