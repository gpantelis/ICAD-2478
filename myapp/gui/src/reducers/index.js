import {combineReducers} from 'redux';
import postsReducer from './postsReducer';
import postOneReducer from './postOneReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import reducer from './auth';

const allReducer = combineReducers({
    postsReducer,
    postOneReducer,
    reducer,
    commentReducer,
    userReducer
});

export default allReducer;