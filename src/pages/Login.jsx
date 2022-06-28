import { login } from '../firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      const user = await login(email,password)
      if(user) {
        navigate('/', {
            replace: true
        })
      }
      
    }


  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={!email || !password} type='submit'>Giriş Yap</button>
      </form>
  )
}

export default Login