/* eslint-disable no-unused-vars */
import "./SideNav.css";
import img from "../../assets/imgs/person.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../Axios/interceptor";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
function SideNav() {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          ` http://localhost:4000/user/${userId}`
        );
        setUserData(response.data.data);
      } catch (error) {
        console.log(`error in fetching data`);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);
  const form = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = form;

  const editUser = async (data) => {
    try {
      const response = await axiosInstance.patch(
        `http://localhost:4000/user/update/${userId}`,
        data
      );
      console.log(response.data);
      navigate("/user-profile");
    } catch (error) {
      console.log(`Error in updating data ${error}`);
    }
  };
  return (
    <>
      <div className="sidenav">
        <div className="profile">
          <img src={img} alt="" width="100" height="100" />
          <div className="name">{userData && userData.fullName}</div>
        </div>
        <div className="sidenav-url">
          <div className="url">
            <a href="#profile" className="active">
              Profile
            </a>
            <hr align="center" />
          </div>
          <div className="url">
            <a className="btn" data-bs-toggle="modal" data-bs-target="#setting">
              Settings
            </a>
            <hr align="center" />
          </div>
        </div>
      </div>

      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="setting"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Setting{" "}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {userData && (
                  <form onSubmit={handleSubmit(editUser)}>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">
                        User name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        {...register("fullName", {
                          required: {
                            value: true,
                            message: `USer Name is required`,
                          },
                          minLength: {
                            value: 8,
                            message: `invalid user name`,
                          },
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="Email"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        htmlFor='Email'
                      {...register('Email',{
                        required:{
                          value:true,
                          message:`Email is required`
                        }
                      })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        {...register('phone',{
                          required:{
                            value:true,
                            message:`phone number is required`
                          },
                          min:{
                            value:8
                          }
                        })}
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label htmlFor="imgURL" className="form-label">
                        Profile Picture
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        {...register('imgURL',{
                          required:false
                        })}
                      />
                    </div> */}

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-success">
                        Save changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default SideNav;
