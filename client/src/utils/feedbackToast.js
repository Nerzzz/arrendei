import {toast} from 'react-toastify'

export function feedbackToast(msg, type){
    if(type === "error"){
        toast.error(msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            theme: "light"
        });
    }
    else{
        toast.success(msg, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            theme: "light"
        });
    }
}