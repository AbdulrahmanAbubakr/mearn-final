import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    getValues,
  } = useForm();
  const password = React.useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:4000/user/register", data)
      .then((response) => {
        console.log("Form data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
      });
  };

  console.log(getValues());

  return (
    <div className="body">
      <div className="row row-col-2  p-20px g-30px">
        {/* left */}
        <div className="registerImg container col-6">
          <img
            src="src\assets\—Pngtree—knowledge tree pencil books stationery_4346186.png"
            alt=""
          />
        </div>

        {/* right */}
        <div className="right col-6 container">
          <div className="registerInfo ">
            <div className="switch ">
              <ul>
                <li className="  active ">
                  <Link to="/Login">Login</Link>
                </li>
                <li className="registerButton  active">
                  <Link to="/Register">Register</Link>
                </li>
              </ul>
            </div>
            <p>
              Welcome To
              <span style={{ color: "#49BBBD", fontSize: "20px" }}>
                {" "}
                Learnova ...{" "}
              </span>
              Explore boundless learning opportunities tailored just for you.
            </p>
            {/* <p className="tx">
            With <span style={{ color: "#49BBBD", fontSize: "20px" }}> Learnova ... </span>
              Explore boundless learning opportunities tailored just for you.
            </p> */}

            <form onSubmit={handleSubmit(onSubmit)} className="registerForm">
              <div className="inputGroup">
                <label htmlFor="username">Username</label>
                <input
                  className="input"
                  type="text"
                  id="username"
                  {...register("username", { required: true, minLength: 3 })}
                />
                {errors.username && errors.username.type === "required" && (
                  <span className="error">This field is required</span>
                )}
                {errors.username && errors.username.type === "minLength" && (
                  <span className="error">
                    Username must be at least 3 characters long
                  </span>
                )}
              </div>

              <div className="inputGroup">
                <label htmlFor="email">Email</label>

                <input
                  className="input"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="error">This field is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="error">Invalid email format</span>
                )}
              </div>

              <div className="inputGroup">
                <label htmlFor="phone">Phone</label>
                <input
                  className="input"
                  type="text" // type text to avoid overflow (don't neeed it in any calculations)
                  id="phone"
                  {...register("phone", { required: true, minLength: 11 })}
                />
                {errors.phone && errors.phone.type === "required" && (
                  <span className="error">This field is required</span>
                )}
                {errors.phone && errors.phone.type === "minLength" && (
                  <span className="error">
                    phone must be at least 11 numbers long
                  </span>
                )}
              </div>

              <div className="inputGroup">
                <label htmlFor="nationalId">National Id</label>
                <input
                  className="input"
                  type="text" // type text to avoid overflow (don't neeed it in any calculations)
                  id="nationalId"
                  {...register("nationalId", { required: true, minLength: 14 })}
                />
                {errors.nationalId && errors.nationalId.type === "required" && (
                  <span className="error">This field is required</span>
                )}
                {errors.nationalId &&
                  errors.nationalId.type === "minLength" && (
                    <span className="error">
                      NationalId must be at least 14 numbers long
                    </span>
                  )}
              </div>

              <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input
                  className="input"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    validate: (value) => {
                      const hasUpperCase = /[A-Z]/.test(value);
                      const hasLowerCase = /[a-z]/.test(value);
                      const hasNumber = /\d/.test(value);
                      const hasSpecialChar =
                        /[!@#$%^&*()_+\-=/[\]{};':"\\|,.<>//?]+/.test(value);
                      return (
                        hasUpperCase &&
                        hasLowerCase &&
                        hasNumber &&
                        hasSpecialChar
                      );
                    },
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="error">This field is required</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="error">
                    Password must be at least 8 characters long
                  </span>
                )}
                {errors.password && (
                  <span className="error">
                    Password must contain at least one uppercase letter, one
                    lowercase letter, one number, and one special character
                  </span>
                )}
              </div>

              <div className="inputGroup">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className="input"
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="inputGroup">
                <label htmlFor="age">Age</label>
                <input
                  className="input"
                  type="number"
                  id="age"
                  {...register("age", { required: true, min: 1 })}
                />
                {errors.age && errors.age.type === "required" && (
                  <span className="error">This field is required</span>
                )}
                {errors.age && errors.age.type === "min" && (
                  <span className="error">Age must be a positive number</span>
                )}
              </div>

              <div>
                <label style={{ fontSize: "16", fontWeight: "700" }}>
                  Gender
                </label>
                <div>
                  <label style={{ fontSize: "14", fontWeight: "700" }}>
                    <input
                      type="radio"
                      value="male"
                      {...register("gender", { required: true })}
                    />{" "}
                    Male
                  </label>{" "}
                  <label style={{ fontSize: "14", fontWeight: "700" }}>
                    <input
                      type="radio"
                      value="female"
                      {...register("gender", { required: true })}
                    />{" "}
                    Female
                  </label>
                </div>
                {errors.gender && errors.gender.type === "required" && (
                  <span className="error">Please select your gender</span>
                )}
              </div>

              <div className="dropdown">
                <label htmlFor="educationLevel">Educational Level</label>

                <select
                  id="educationLevel"
                  {...register("educationLevel", { required: true })}
                >
                  <option value="">Select Educational Level</option>
                  <option value="primary">Primary</option>
                  <option value="middle">Scondary</option>
                  <option value="high">High</option>
                  <option value="College">College</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
                {errors.educationLevel && (
                  <span className="error">This field is required</span>
                )}
              </div>

              <div className="dropdown">
                <label htmlFor="academicYear">Academic Year</label>
                <select
                  id="academicYear"
                  {...register("academicYear", { required: true })}
                >
                  <option value="">Select Academic Year</option>
                  <option value="1th">1th</option>
                  <option value="2th">2th</option>
                  <option value="3th">3th</option>
                  <option value="4th">4th</option>
                  <option value="5th">5th</option>
                  <option value="6th">6th</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
                {errors.academicYear && (
                  <span className="error">This field is required</span>
                )}
              </div>
              {/* <br /> */}
              <button type="submit" disabled={!isDirty} className="register ">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
