import { Link } from 'react-router'
import { useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../firebase.config"

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginHandler(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then(() => {
      alert("logado")
    }).catch((err) => {
      alert(`Ocorreu um erro: ${err.message}`)
    })
  }

  return (
    <main>
        <div className="login_container">
            <h1>Login</h1>
            <p>Preencha seus dados e acesse o sistema!</p>
            <form action="" onSubmit={loginHandler}>
                <input type="text" name="login" placeholder="johndoe@example.com" onChange={e => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Entrar" />
                <span>Não tem uma conta? <Link to={"/register"}>Crie uma</Link></span>
            </form>
        </div>
    </main>
  )
}

export default Login