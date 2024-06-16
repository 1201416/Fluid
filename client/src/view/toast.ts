import {toast, ToastOptions} from "react-toastify";

const options : ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
};

export default class Toast {
    public static showSuccess = (message: string) => {
        toast.success(message, options);
    };

    public static showFailure = (message: string) => {
        toast.error(message, options);
    };

    public static showInfo = (message: string) => {
      toast.info(message, options);
    };
}