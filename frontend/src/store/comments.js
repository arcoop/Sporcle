import csrfFetch from "./csrf"

const SET_COMMENTS = 'comments/setComments'
const SET_COMMENT = 'comments/setComment'
const REMOVE_COMMENT = 'comments/setComment'

export const setComments = comments => ({
    type: SET_COMMENTS,
    payload: comments
})

export const setComment = comment => ({
    type: SET_COMMENT,
    payload: comment
})

export const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    payload: commentId
})

export const getComments = state => {
    return Object.values(state.comments)
}

export const fetchComments = quizId => async dispatch => {
    const res = await csrfFetch(`api/quizzes/${quizId}/comments`)
    const data = await res.json()
    dispatch(setComments(data))
}

export const createComment = (comment, quizId) => async dispatch => {
    const res = await csrfFetch(`api/quizzes/${quizId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment)
    })
    const data = await res.json()
    dispatch(setComment(data))
}

export const updateComment = (comment, quizId) => async dispatch => {
    const res = await csrfFetch(`api/quizzes/${quizId}/comments/${comment.id}`, {
        method: 'PUT',
        body: JSON.stringify(comment)
    })

    const data = await res.json()
    dispatch(setComment(data))
}

export const deleteComment = (commentId, quizId) => async dispatch => {
    const res = await csrfFetch(`api/quizzes/${quizId}/comments/${commentId}`, {
        method: 'DELETE'
    })

    dispatch(removeComment(commentId))
    return res
}

const commentsReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_COMMENTS:
            return {...state, ...action.payload}
        case SET_COMMENT:
            return {...state, ...action.payload}
        case REMOVE_COMMENT:
            const nextState = {...state}
            delete nextState[action.payload]
            return nextState
        default:
            return state
    }
}

export default commentsReducer;