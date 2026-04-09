import { Link, useNavigate } from 'react-router'
import { useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.config'

import ActionButton from '../components/ActionButton'
import { feedbackToast } from '../utils/feedbackToast'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate()

  function loginHandler(e){
    e.preventDefault()

    if(email == ""){
      feedbackToast("Preencha o campo de email!", false)
      return
    }
    if(password == ""){
      feedbackToast("Preencha o campo de senha!", false)
      return
    }

    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password).then(() => {
      feedbackToast("login realizado com sucesso!", true)
      navigate("/")
    }).catch((err) => {
      feedbackToast(`Ocorreu um erro: ${err.message}`, false)
      setIsLoading(false)
    })
  }

  return (
    <main className="flex justify-center items-center h-full flex-1 bg-[#f7f7f7]">
      <div className='bg-white shadow-[0_0_60px_rgba(0,0,0,0.10)] flex rounded-[20px]'>
        <img src="/images/mulher-utilizando-o-celular.png" alt="" className="max-w-[300px] object-cover rounded-tl-[20px] rounded-bl-[20px]" />
        <div className='flex flex-col px-[60px] flex-1 justify-center'>
          <h2>Login</h2>
          <p>Preencha seus dados e anuncie em nosso sistema!</p>
          <form className='mt-[30px]' onSubmit={loginHandler}>
            <input type="text" name="login" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
            <ActionButton text="Entrar" isLoading={isLoading} />
            <span>Não tem uma conta? <Link to={"/register"} className='text-primary underline'>Crie uma</Link></span>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login