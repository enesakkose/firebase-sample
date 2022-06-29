import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, emailVerified, addTodo, deleteTodo } from '../firebase'
import {logout as logoutHandle} from '../store/auth'
import { useNavigate } from 'react-router-dom'

function Home() {


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { todos } = useSelector(state => state.todos)
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

  const [todo, setTodo] = useState('')

  const submitHandle = async(e) => {
    e.preventDefault()
    await addTodo({
      todo,
      uid: user.uid
    })
    setTodo('')
  }

  const deletee = async(id) => {
   await deleteTodo(id)
  }

  if(user) {
    return(
      <>
        {user.photoURL && <img src={user.photoURL}/>} 
        Hoşgeldin ({user.displayName}) oturumun açık
        <Link to='/settings'>Ayarlar</Link>
        <button onClick={handleLogout}>Çıkış Yap</button>
        {!user.emailVerified && 
        <button onClick={handleVertifiaction}>E postanızı onaylayın</button>}
        

        <form onSubmit={submitHandle}>
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder='todo yaz' />
          <button type='submit' disabled={!todo}>Ekle</button>
        </form>

        {todos.length > 0 && ( 
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.todo}

              <button onClick={() => deletee(todo.id)}>sil</button>
            </li>
          ))}
        </ul>)}

        {todos.length === 0 && (
          <div>todonuz yok</div>
        )}
      </>
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