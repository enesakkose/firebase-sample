import { register } from '../firebase'
import { useState } from 'react'
 

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = async(e) => {
      e.preventDefault()
      const user = await register(email,password)
      console.log(user)
      setEmail('')
      setPassword('')
    }
  

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={!email || !password} type='submit'>Kayıt ol</button>
      </form>
  )
}

export default Register