export function firebaseResponseFormat(code){
     switch(code){
     case "auth/email-already-in-use":
          return "Email já se encontra em uso"

     case "auth/invalid-credential":
          return "Combinação de login e senha não encontrados"

     case "auth/invalid-email":
          return "Email inválido"

    case "auth/weak-password":
          return "Senha muito fraca"

     case "auth/user-not-found":
          return "Usuário não encontrado."

     default:
          return "Um erro inesperado ocorreu"
  }
}

const months = [
     "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Des"
]

export function dateFormat(date){
     let day = new Date(date).getDate()
     let month = new Date(date).getMonth()
     let year = new Date(date).getFullYear()

     return `${day} de ${months[month]} de ${year}`
}