import { toast, ToastOptions } from "react-toastify";

const toastConfig: ToastOptions<{}> = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

class UI {
  static getDefaultMessage = (message?: string) => {
    if (!message) return 'Some thing went wrong!';
    return message;
  }

  static toastInfo = (text?: string) => {
    toast.info(text, toastConfig);
  }

  static toastWarning = (text?: string) => {
    toast.warning(text, toastConfig);
  }

  static toastError = (text?: string) => {
    toast.error(text, toastConfig);
  }

  static toastSuccess = (text?: string) => {
    toast.success(text, toastConfig);
  }
}

export default UI;