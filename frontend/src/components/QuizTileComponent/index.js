import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser, fetchUsers } from "../../store/users"
import { getUser } from "../../store/users"
import { Link } from "react-router-dom"
import './QuizTile.css'

const QuizTile = ({quiz, type}) => {
    const dispatch = useDispatch()

    const categoryId = quiz ? quiz.categoryId : 1

    let category = useSelector(state => state.categories[categoryId])

    // useEffect(() => {
    //     dispatch(fetchUsers())
    // }, [quiz])
    quiz ||= {}
    const user = useSelector(state => state.users[quiz.authorId]) || {username: "Loading username"}

    // const user = quiz.author

    const image = quiz.iconUrl ? <img src={quiz.iconUrl} alt="" /> : <img className="quiz-icon" src="https://cdn.writermag.com/2019/03/question-marks.jpg" alt="" />

    return (
        <div className="quiz-tile">
            <Link className="link-to-quiz-show" to={`/quizzes/${quiz.id}`}>
                <div className={`quiz-icon-tile ${type}`}>
                    {image}
                    <div className="quiz-tile-title">{quiz.title}</div>
                    <div className="second-div"></div>
                    
                </div>
                <div className="author-category-time">
                    <div className="quiz-tile-author">by {user.username}</div>
                    <div className="quiz-tile-cat">{category.name}</div>
                    <div className="quiz-tile-time">{quiz.quizTimer}m</div>
                    <div className="hidden-div"></div>
                </div>
            </Link>
            <div className="quiz-tile-description">{quiz.description}</div>
            
        </div>
    ) 
}

export default QuizTile;