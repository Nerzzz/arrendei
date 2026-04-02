import { Link } from "react-router"

function Login() {
  return (
    <main>
        <div className="login_container">
            <h1>Login</h1>
            <p>Preencha seus dados e acesse o sistema!</p>
            <form action="" name="formLogin">
                <input type="text" name="login" placeholder="johndoe@example.com" />
                <input type="password" name="password" placeholder="Senha" />
                <input type="submit" value="Entrar" />
                <span>Não tem uma conta? <Link to={"/register"}>Crie uma</Link></span>
            </form>
        </div>
    </main>
  )
}

export default Login