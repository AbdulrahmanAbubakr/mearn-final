/* eslint-disable no-unused-vars */
import "./Details.css";
import img from "../../assets/imgs/js icon.png";
import axiosInstance from "../../Axios/interceptor";
import { useEffect, useState } from "react";
function Details() {
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(
             ` http://localhost:4000/user/${userId}`
            );
            setUserData(response.data.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        if (userId) {
          fetchData();
        }
      }, [userId]);
  return (
    <div className="main">
      <h2>IDENTITY</h2>
      <div className="card">
        <div className="card-body">
          <i className="fa fa-pen fa-xs edit"></i>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{userData && userData.fullName} </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>

                <td>{userData && userData.Email}</td>
              </tr>
              {/* <tr>
                <td>Address</td>
                <td>:</td>
                <td>Aswan, Egypt</td>
              </tr> */}
              <tr>
                <td>Phone</td>
                <td>:</td>
                <td>{userData && userData.phone}</td>
              </tr>
              <tr>
                <td className="dropdown  ">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Courses
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Html
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Css
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        JavaScript
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2>COURSE</h2>
      <div className="course-card ">
        <div className="img">
          <img src={img} />
        </div>
        <div className="content">
          <h2>The Complete JavaScript Course 2024: From Zero to Expert!</h2>
          <p>
            The modern JavaScript course for everyone! Master JavaScript with
            projects, challenges and theory. Many courses in one!
          </p>

          <progress id="file" value="32" max="100"></progress>

          <a href="#" className="btn btn-primary">
            Start now <i className="fa-solid fa-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Details;
