import  {DETAIL_POST} from '../actions/getPostsActions';
import initialState from './initialState';

export default function postOneReducer(state= null,action) {
    //console.log('EIMAI STO REDUCER GIA TO ENA POST')

    switch(action.type){
        case DETAIL_POST:
        console.log('-------------------------')
        console.log('EIMAI STO REDUCER GIA TO ENA POST KAI KANW KATI', action.payload)
        console.log('-------------------------')
            return action.payload;

        default:
        return state;
    }
}