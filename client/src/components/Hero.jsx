import { Link } from 'react-router'

function Hero() {
  return (
    <div className="flex mt-[50px] bg-linear-to-r from-primary to-accent text-white p-[0 30px] items-center justify-evenly rounded-b-[10px]">
        <div className='flex flex-col'>
            <h1>Deseja anunciar?</h1>
            <p>Para anunciar seus itens, basta criar ou entrar em sua conta!</p>
            <Link to={"/login"} className="bg-white text-black mt-6 text-center px-[40px] py-[10px] font-medium rounded-[10px] w-fit">Entrar</Link>
        </div>
        <img src="/images/fechando-negocio.png" alt="homens se cumprimentando" 
        className='max-w-125 drop-shadow-[]'/>
    </div>
  )
}

export default Hero