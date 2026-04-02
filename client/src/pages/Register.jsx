import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { auth } from "../../firebase.config"

function Register() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    async function sendUser() {
        try{
            const response = await fetch("https://arrendei-630d.onrender.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: "2",
                    email: login,
                    password: password,
                    username: "Teste"
                })
            })

            const data = await response.json()
            console.log(data)
            alert("Usuário criado e registrado")
        } catch (err) {
            console.error(`Ocorreu um erro: ${err}`)
        }
    }

    function handleRegister(e){
        e.preventDefault()
        createUserWithEmailAndPassword(auth, login, password).then(() => {
            sendUser()
        }).catch((err) => {
            alert(`Ocorreu um erro: ${err}`)
        })
    }

  return (
    <main>
        <h2>Criar Conta</h2>
        <p>Crie sua conta para <span className='italic'>arrendar</span> seus itens!</p>
        <form onSubmit={handleRegister}>
            <div>
                <span>Login</span>
                <input type="email" name='email' placeholder="johndoe@exemple.com" onChange={e => setLogin(e.target.value)} />
                <input type="password" name='password' placeholder="Senha" onChange={e => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Criar conta" />
            <span>Já possuí uma conta? <Link to={"/login"}>Faça login</Link></span>
        </form>
    </main>
  )
}

export default Register