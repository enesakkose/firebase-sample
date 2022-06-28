import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, emailVerified } from '../firebase'
import {logout as logoutHandle} from '../store/auth'
import { useNavigate } from 'react-router-dom'
import UpdateProfile from '../components/UpdateProfile'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const handleLogout = async() => {
    await logout()
    dispatch(logoutHandle())
    navigate('/login', {
      replace: true
    })
  }

  const handleVertifiaction = async() => {
    await emailVerified()
  }



  if(user) {
    return(
      <div>
        {user.photoURL && <img src={user.photoURL}/>} 
        Hoşgeldin ({user.email}) oturumun açık
        <button onClick={handleLogout}>Çıkış Yap</button>
        {!user.emailVerified && 
        <button onClick={handleVertifiaction}>E postanızı onaylayın</button>}
        <UpdateProfile/>
      </div>
    )
  }
  return (
    <div>
      
        <Link to='/login'>
            Giriş Yap
        </Link>

        <Link to='/register'>
            Kayıt ol
        </Link>

    </div>
  )
}

export default Home