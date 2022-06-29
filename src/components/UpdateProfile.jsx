import React from 'react'
import {useState} from 'react'
import { update, auth, resetPassword } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../utils'

function UpdateProfile() {

  const { user } = useSelector(state => state.auth)

  const [displayName, setDisplayName] = useState(user.displayName || '') 
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState(user.photoURL || '') 

    const handleSubmit = async(e) => {
        e.preventDefault()
        await update({
            displayName,
            photoURL: avatar
        })
        setUserData()
    }

    const handleResetSubmit = async(e) => {
        e.preventDefault()
      const result = await resetPassword(password)
      if(result) {
        setPassword('')
      }  
      
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <h1>Profili Güncelle</h1>
        <h3>Ad soyad</h3>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder='John Doe' />

        <h3>Fotoğraf</h3>
        <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder='Link' />
        <button>Güncelle</button>
    </form>
    <form onSubmit={handleResetSubmit}>
        <h1>Parola</h1>
        
        <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Parola' />
        <button disabled={!password} type='submit'>şifre güncelle</button>
        
    </form>
    </>
  )
}

export default UpdateProfile