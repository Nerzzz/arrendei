import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { auth } from "../../firebase.config"

import { feedbackToast } from "../utils/feedbackToast"
import { firebaseResponseFormat } from "../utils/dataFormat"

import ActionButton from "../components/ActionButton"

function Register() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [cell, setCell] = useState('')
    const [isLoading, setIsloadind] = useState(false)

    let navigate = useNavigate()

    async function sendUser(uid) {
        try{
            const response = await fetch("https://arrendei-630d.onrender.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: uid,
                    email: login,
                    password: password,
                    username: username,
                    cell: cell
                })
            })

            feedbackToast("Conta criada com sucesso!", true)
            navigate("/")
        } catch (err) {
            setIsloadind(false)
        }
    }

    function handleRegister(e){
        e.preventDefault()
        
        if(login == "") { 
            feedbackToast("Preencha o campo de email!", false)
            return false 
        }
        if(password == "") { 
            feedbackToast("Preencha o campo de senha!", false)
            return false
        }
        if(username == "") { 
            feedbackToast("Preencha o campo de usuário!", false)
            return false 
        }
        
        if(cell == "") { 
            feedbackToast("Informe um número de Whatsapp!", false)
            return false
        }
        if(!/^[1-9]{2}9\d{8}$/.test(cell)){
            feedbackToast("Informe um número válido!", false)
            return false
        }
        
        setIsloadind(true)
        createUserWithEmailAndPassword(auth, login, password).then((userCredential) => {
            sendUser(userCredential.user.uid)
        }).catch((err) => {
            feedbackToast(firebaseResponseFormat(err.code), false)
            setIsloadind(false)
        })
    }

  return (
    <>
        <main className="flex justify-center items-center h-screen flex-1">
            <div className="bg-white shadow-[0_0_60px_rgba(0,0,0,0.10)] flex rounded-[20px]">
                <img src="/images/agronomo-escolhendo-maquina.jpg" className="max-w-[300px] object-cover md:inline hidden rounded-tl-[20px] rounded-bl-[20px]" />
                <div className="p-[40px] flex-1 flex flex-col">
                    <h2>Criar Conta</h2>
                    <p>Crie sua conta para <span className='italic'>arrendar</span> seus itens!</p>
                    <form onSubmit={handleRegister} className="flex flex-col gap-[60px] mt-[20px]">
                        <div className="flex flex-col">
                            <span className="text-[10pt] font-semibold">Login</span>
                            <div className="flex lg:flex-row flex-col gap-[15px]">
                                <input type="email" name='email' placeholder="Email" onChange={e => setLogin(e.target.value)} />
                                <input type="password" name='password' placeholder="Senha" onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10pt] font-semibold">Social</span>
                            <div className="flex flex lg:flex-row flex-col gap-[15px]">
                                <input type="text" name="username" placeholder="Nome de usuário" onChange={e => setUsername(e.target.value)} />
                                <input type="tel" maxLength={11} name="cell" placeholder="Telefone (Whatsapp)" onChange={e => setCell(e.target.value)} />
                            </div>
                        </div>
                        <ActionButton text="Criar conta" isLoading={isLoading} />
                        <span>Já possuí uma conta? <Link to={"/login"} className="text-primary underline">Faça login</Link></span>
                    </form>
                </div>
            </div>
        </main>
    </>
  )
}

export default Register