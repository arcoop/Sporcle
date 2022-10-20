import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";
import './Navigation.css'
import { Link } from "react-router-dom";
// import LoginFormModal from "../LoginFormModal";
import React from "react";
import FormModal from "../AuthFormComponent";
import Header from "./Header";


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)

    const leftNav = (
        <div className="left-nav">
            <div className="nav-link-items">
                <Link className="navLinks" to="/" id="home-link">
                    <i className="fa-solid fa-house-chimney" id="home-button"></i> 
                    <p>quizzes</p>
                </Link>
                <Link className="navLinks" to={'/create'} id="quiz-create-link">
                        <p id="quiz-creation">quiz creation</p>
                </Link>
                
                <div className="line-break" id="nav-line-break"></div>

                <a className="navLinks" href="mailto:cooperadina@gmail.com?subject='Love your work!'&body='Really enjoyed looking at your work. Would love to set up a time to talk.'">
                    <i id="email-icon" className="fa-regular fa-envelope"></i>
                    <p>Email me!</p>
                </a>
                
                <a className="navLinks" href="https://www.linkedin.com/in/adina-cooper/">
                    <i id='LinkedIn' className="fa-brands fa-linkedin"></i>
                    {/* <p>LinkedIn</p> */}
                </a>
                <a className="navLinks" href="https://github.com/arcoop">
                    <i id="github-link" class="fa-brands fa-github"></i>
                </a>
                {/* <Link to="/">
                    <p>sparklecon</p>
                </Link> */}
            </div>
        </div>
    )

    let rightNav;
    if (sessionUser) {
        rightNav = (
            <div className="right-nav">
                <div className="profile-button">
                    <ProfileButton user={sessionUser}/>
                </div>
                {/* <Redirect to='/'/> */}
            </div>
        )
    } else {
        rightNav = (
            <div className="loginsignup">
                <FormModal />
            </div>
        )
    }

    return (
        <div className="header-div">
            <div className="navbar">
                {leftNav}
                {rightNav}
            </div>
            <div className="inner-header">
                <Header />
            </div>
        </div>
    )
}

export default Navigation;