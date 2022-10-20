import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUsers, getUser } from '../../store/users';
import './UserShow.css'
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Navigation/Footer';
import { fetchQuizTakes, getQuizTakes } from '../../store/quizTakes';
import { fetchQuizzes, getQuizzes } from '../../store/quizzes';
import { useState } from 'react';

const UserShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const sessionUser = useSelector(state => state.session.user)
    
    useEffect(() => {
        dispatch(fetchUsers(id))
        dispatch(fetchQuizTakes())
    },[id])

    let user = useSelector(getUser(id)) || {username: "username...", email: "email..."}
    console.log(user)
    console.log(user.quizzesAuthored)

    const quizTakes = useSelector(getQuizTakes)

    let userQuizTakes = []
    quizTakes.forEach(take => {
        if (take['takerId'] == id) {
            userQuizTakes.push(take)
        }
    })

    useEffect(() => {
        dispatch(fetchQuizzes())
    }, [user])

    const quizzes = useSelector(getQuizzes)
    
    useEffect(() => {
        document.title = `${user.username}'s Sparkle Profile`
    }, [user])
    
    const formatDate = date => {
        const months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sept',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        }
        const fullDate = new Date(date)
        const month = months[fullDate.getMonth()];
        const day = fullDate.getDate();
        const year = fullDate.getFullYear();
        return `${month} ${day}, ${year}`
    }

    const formatTime = date => {
     
        const start = new Date(date)
      
        const now = new Date()

        let finalTimeDiff;
        let elapsedTime = now - start
        elapsedTime /= 1000
        if (Math.round(elapsedTime / 3600) >= 1){
            finalTimeDiff = Math.round(elapsedTime /= 3600)
        } else {
            finalTimeDiff = Math.round(elapsedTime / 60)
        }
  
        let timeText; 
        if (finalTimeDiff === 1) {
            timeText = "hour"
        } else if (finalTimeDiff > 1) {
            timeText = "hours"
        } else timeText = "minutes"
    
        return `${finalTimeDiff} ${timeText} ago`
    }

    const [playsTabClass, setPlaysTabClass] = useState("user-profile-tab")
    const [quizzesTabClass, setQuizzesTabClass] = useState("hide")
    const [playsButton, setPlaysButton] = useState("button-active")
    const [quizzesButton, setQuizzesButton] = useState("user-profile-tab-button")

    const handleClick = (tab) => {
       if (tab === "plays") {
        setPlaysTabClass("user-profile-tab")
        setQuizzesTabClass('hidden')
        setQuizzesButton("user-profile-tab-button")
        setPlaysButton("button-active")
       } else if (tab === "quizzes") {
        setQuizzesTabClass("user-profile-tab")
        setPlaysTabClass("hidden")
        setPlaysButton("user-profile-tab-button")
        setQuizzesButton("button-active")
       }
    }

    let onlineStatus;
    if (sessionUser) {
        onlineStatus = 
        <div id='online'>
            <i id="online-circle" className="fa-solid fa-circle"></i>
            <p>Online</p>
        </div>
    }  else onlineStatus = ""

    const ShowQuizzesAuthored = () => {
        if (user.quizzesAuthored) {
            return (
                <ul className='quizzes-created-list'>
                    {user.quizzesAuthored.map(quiz => {
                        return (
                            <li className='quizzes-created-link'><Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link></li>
                        )
                    })}
                </ul>
            )
        } else {
            return <></>
        }
    } 

    return (
        <div id="users-show-page">
            <Navigation />
            <div id="show-page-top-section">
                <div id='show-page-icon'>
                    <i id="show-page-prof-icon" className="fa-regular fa-user"></i>
                </div>
                <div id='user-show-page-info'>
                    <div id='username-and-edit'>
                        <h2 id='username'>{user.username}</h2>
                        <button id='edit-button'>Edit Profile</button>
                    </div>
                    <div id='show-page-top-info'>
                        {onlineStatus}
                        <div id='user-since'>
                            <i id='clock-icon' className="fa-solid fa-clock"></i>
                            <p>User since {formatDate(user.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div id='main-user-profile'>
                <div  id='profile-bar-container'>
                    <div id="show-page-profile-bar">
                        <div id='profile-header'>Profile</div>
                        <div className='user-prof-tab'>
                            <button id='user-plays-tab-button' className={playsButton} onClick={() => handleClick('plays')}>Plays</button>
                            <button id='user-quizzes-tab-button'className={quizzesButton} onClick={() => handleClick('quizzes')}>Quizzes</button>
                        </div>
                    </div>
                </div>

                <div id='user-quiz-plays' className={playsTabClass}>
                    <table className='quiz-takes-table'> 
                        <tbody className='quiz-takes-table-body'>
                            <tr className='quiz-takes-heading-row'>
                                <th className='quiz-takes-heading'>Quiz</th>
                                <th className='quiz-takes-heading'>Time Taken</th>
                                <th className='quiz-takes-heading'>Score</th>
                            </tr>
                            {quizTakes.map(take => {
                                if (quizzes[take.quizId -1]) {
                                    return (
                                        <tr className='quiz-takes-row'>
                                            <td className='quiz-takes-data'>{quizzes[take.quizId -1].title}</td>
                                            <td className='quiz-takes-data'>{formatTime(take.createdAt)}</td>
                                            <td className='quiz-takes-data'>{take.score}</td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>

                <div id='user-quizzes-created' className={quizzesTabClass}>
                    <h2 className='tab-heading'>Quizzes Created</h2>
                    <ShowQuizzesAuthored />
                </div>
            </div>

           
           

            {/* <Footer /> */}
        </div>
    )

}

export default UserShow;