import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Auth.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth/AuthContext";
import { emailRegex, passwordRegex } from "../../utils/Constants";
import { handleLogin } from "../../services/ApiCalls";

export default function Signup() {
  const defaultData = {
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [userData, setUserData] = useState(defaultData);
  const [submitMode, setSubmitMode] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const { setIsLogged, setUserDetails } = useAuth();
  const [error, setError] = useState({
    email: {
      isError: false,
      errorMessage: "Enter a valid mail",
    },
    password: {
      isError: false,
      errorMessage:
        "Password must contain minimum eight characters, and should be alphanumeric and contain special character.",
    },
    confirmPassword: {
      isError: false,
      errorMessage: "Password does not match",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCfmPassword, setShowCfmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { value, name } = e.target;
    if (name === "password") {
      setCheckPassword(value);
    }
    const validateError = validateForm(name, value);
    setError((prevValue) => ({
      ...prevValue,
      [name]: {
        ...prevValue[name],
        isError: validateError,
      },
    }));
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (name, value) => {
    switch (name) {
      case "email":
        return !emailRegex.test(value);
      case "password":
        return !passwordRegex.test(value);
      case "confirmPassword":
        return checkPassword !== value;
      default:
        return false;
    }
  };

  useEffect(() => {
    let flag = false;
    Object.entries(error).forEach((i) => {
      if (i[1].isError) {
        flag = true;
      }
    });
    setSubmitMode(flag);
  }, [error]);

  console.log(submitMode);

  const handleSignup = async (userData) => {
    try {
      const response = await axios.post("/api/auth/signup", userData);
      if (response.status === 201) {
        setUserDetails(userData);
        setUserData(defaultData);
        toast.success("You're signed up!");
        // navigate("../login", { replace: true });
        localStorage.setItem("Token", response.data.encodedToken);
        handleLogin(userData, setIsLogged, setUserDetails, navigate);
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const pwdVisibiltyHandler = (e) => {
    e.preventDefault();
    setShowPassword(() => !showPassword);
  };

  const cfmpwdVisibiltyHandler = (e) => {
    e.preventDefault();
    setShowCfmPassword(() => !showCfmPassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleSignup(userData);
  };
  return (
    <main
      className={`${styles.auth_content} content flex-row-wrap flex-mid-center`}
    >
      <div
        className={`${styles.glass__form} flex-mid-center flex-column-wrap flex-gap20`}
      >
        <h4 className="header-5">Sign Up</h4>
        <p className="body-1">Let's get you started with MindPalace.</p>
        <form
          className={`${styles.glass__form__wrapper}  flex-mid-center br-8 flex-column-wrap`}
          onSubmit={submitHandler}
        >
          <div className="input__container">
            <input
              type="name"
              placeholder="Full Name"
              name="firstName"
              onChange={handleInput}
              value={userData.name}
              className={`input__field ${styles.glass__input}`}
              required
            />
          </div>
          <div className="input__container">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleInput}
              className={`input__field ${styles.glass__input}`}
              required
            />
          </div>
          {error?.email?.isError && (
            <div className={styles.error_msg}>{error.email.errorMessage}</div>
          )}
          <div className="input__container position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="pwd1"
              value={userData.password}
              className={`input__field ${styles.glass__input} `}
              onChange={handleInput}
              required
            />
            {showPassword ? (
              <button
                onClick={pwdVisibiltyHandler}
                className={`btn_action position-absolute ${styles.passwordIcon} btn--small flex-mid-center transparent-btn`}
              >
                <span className="material-icons">visibility_off</span>
              </button>
            ) : (
              <button
                onClick={pwdVisibiltyHandler}
                className={`btn_action position-absolute ${styles.passwordIcon} btn--small flex-mid-center transparent-btn`}
              >
                <span className="material-icons">visibility</span>
              </button>
            )}
          </div>
          {error.password?.isError && (
            <div className={styles.error_msg}>
              {error.password?.errorMessage}
            </div>
          )}

          <div className="input__container position-relative">
            <input
              type={showCfmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              id="pwd2"
              value={userData.confirmPassword}
              className={`input__field ${styles.glass__input} `}
              onChange={handleInput}
              required
            />
            {showCfmPassword ? (
              <button
                onClick={(e) => cfmpwdVisibiltyHandler(e)}
                className={`btn_action position-absolute ${styles.passwordIcon} btn--small flex-mid-center transparent-btn`}
              >
                <span className="material-icons">visibility_off</span>
              </button>
            ) : (
              <button
                onClick={(e) => cfmpwdVisibiltyHandler(e)}
                className={`btn_action position-absolute ${styles.passwordIcon} btn--small flex-mid-center transparent-btn`}
              >
                <span className="material-icons">visibility</span>
              </button>
            )}
          </div>
          {error.confirmPassword?.isError && (
            <div className={styles.error_msg}>
              {error.confirmPassword?.errorMessage}
            </div>
          )}
          <button
            type="submit"
            disabled={submitMode ? true : false}
            className={`btn btn--primary btn--large ${styles.glass__btn} ${styles.glass__btn_1}`}
          >
            Sign up
          </button>
          <p className="subtitle-2">Already a Member?</p>
          <Link
            to="/login"
            className={`btn btn--large ${styles.glass__btn} ${styles.glass__btn_2}`}
          >
            Log In
          </Link>
        </form>
      </div>

      <div
        className={`${styles.glass__form__image} flex-mid-center position-relative`}
      >
        <img
          src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1653129623/TheMindPalace/Sign_up-cuate_iuznti.png"
          alt="banner-sign-up"
        />
      </div>
    </main>
  );
}
