// import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Axios/interceptor";
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axiosInstance
      .post("http://localhost:4000/user/login", data)
      .then((response) => {
        console.log(response);
        // login(response.data.data.user);
        localStorage.setItem("userId", response.data.data.user._id);
        // location(/profile/, { state: response.data.data.user });
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
      });
  };
  console.log(getValues());

  return (
    <div className="body">
      <div className=" row row-col-2 p-20px g-30px">
        {/* left */}
        <div className="loginImg container col-6">
          <img
            src="src\assets\imgs\—Pngtree—knowledge tree pencil books stationery_4346186.png"
            alt=""
          />
        </div>

        {/* right */}
        <div className=" right col-6 container ">
          <div className="loginInfo">
            <p>
              Welcome To{" "}
              <span style={{ color: "#49BBBD", fontSize: "20px" }}>
                {" "}
                Learnova{" "}
              </span>
            </p>
            <div className="switch">
              <ul>
                <li className="loginButton active">
                  <Link to="/Login">Login</Link>
                </li>
                <li className=" active">
                  <Link to="/Register">Register</Link>
                </li>
              </ul>
            </div>
            <p className="tx">
              With{" "}
              <span style={{ color: "#49BBBD", fontSiz: "20px" }}>
                {" "}
                Learnova ...{" "}
              </span>
              Explore boundless learning opportunities tailored just for you.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputBox">
                <label htmlFor="email">Email</label>

                <input
                  className="input"
                  type="email"
                  id="email"
                  {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.Email && errors.Email.type === "required" && (
                  <span className="error">This field is required</span>
                )}
                {errors.Email && errors.Email.type === "pattern" && (
                  <span className="error">Invalid email format</span>
                )}
              </div>

              <div className="inputBox">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  {...register("Password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.Password && (
                  <p className="error">{errors.Password.message}</p>
                )}
              </div>

              <div className="forgot">
                <a rel="#" href="#">
                  Forgot Password ?
                </a>
              </div>

              <button type="submit" className="login">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
