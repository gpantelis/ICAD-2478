import Axios from "axios";
import comment from "../components/comment";

export const FETCH_POSTS_BEGIN   = 'FETCH_POSTS_BEGIN';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const DETAIL_POST = 'DETAIL POST';
export const FETCH_COMMEND_SUCCESS = 'FETCH_COMMEND_SUCCESS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const fetchPostBegin = () => ({
  type: FETCH_POSTS_BEGIN
});

export const fetchPostSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
});

export const getOnePost = post => ({
    type:DETAIL_POST,
    payload: post
})



export const fetchCommendSuccess = commends => ({
    type: FETCH_COMMEND_SUCCESS,
    payload: commends
})

export const fetchUserSuccess = user => ({
    type: FETCH_USER_SUCCESS,
    payload: user
})

function getPosts(){
    console.log('TREXEI I GETPOSTS')
    Axios.defaults.headers = {
        "Content-Type":"application/json",
        Authorization : localStorage.getItem('token')
    }
    return Axios.get('http://localhost:8000/api/posts/')
        .then(res => {
            console.log('post',res.data)
            return res.data
            
        })
        .catch(error => {
            console.log('to lathos einai : ',error)
            return error
          
        })
}

export function loadPosts(text){
    return function(dispatch){
        return getPosts().then(posts => {
            console.log('loadposts',posts)
            dispatch(fetchPostSuccess(posts));
        }).catch(error => {
            fetchPostFailure(error)
        })
    
    }
}

function getPostCommends(id){
    console.log('TREXEI I getPostCommends')
    Axios.defaults.headers = {
        "Content-Type":"application/json",
        Authorization : localStorage.getItem('token')
    }
    return Axios.get('http://localhost:8000/api/comments/')
        .then(res => {
            console.log('comments',res.data)
            return res.data.filter(com => com.post === id)
            
        })
        .catch(error => {
            console.log('to lathos einai : ',error)
            return error
          
        })
}

export function loadComments(id){
    return function(dispatch){
        return getPostCommends(id).then(comments => {
            console.log('loadcommentsd',comments)
            dispatch(fetchCommendSuccess(comments));
        }).catch(error => {
            fetchPostFailure(error)
        })
    
    }
}

function getUserInfo(id){
    return Axios.get('http://localhost:8000/api/user/'+id)
    .then(res => {
        console.log('post',res.data)
        return res.data
        
    })
    .catch(error => {
        console.log('to lathos einai : ',error)
        return error
      
    })
}

export function loadUser(id){
    return function(dispatch){
        return getUserInfo(id).then(comments => {
            console.log('loaded user',comments)
            dispatch(fetchUserSuccess(comments));
        }).catch(error => {
            fetchPostFailure(error)
        })
    
    }
}

