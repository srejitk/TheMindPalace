import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ({ message, type }) {
  return toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
    type: type,
    transition: Slide,
    theme: "light",
    closeOnClick: true,
    pauseOnHover: false,
  });
}
