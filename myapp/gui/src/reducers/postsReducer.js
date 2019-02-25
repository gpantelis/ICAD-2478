import  {FETCH_POSTS_SUCCESS} from '../actions/getPostsActions';
import initialState from './initialState';


export default function postsReducer(state = initialState.posts, action) {
    switch(action.type) {
        case FETCH_POSTS_SUCCESS:
            return  action.payload.posts;
        default:
        return state;
    }
}
