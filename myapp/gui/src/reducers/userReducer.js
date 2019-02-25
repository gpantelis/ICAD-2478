import  {FETCH_USER_SUCCESS} from '../actions/getPostsActions';

export default function userReducer(state= null,action) {

    console.log('=========================================================================')
    console.log('---------------------------USER REDUCER-------------------------------')
    console.log('=========================================================================')
    console.log('Action Type: ',action.type)
    console.log('-------------------------------------------------------------------------')
    console.log('Action payload: ',action.payload)
    console.log('=========================================================================')
    switch(action.type){
        case FETCH_USER_SUCCESS:
        console.log('-------------------------Mpika kai ta stelnw-----------------------------')
        console.log('=========================================================================')
                 return  action.payload;
        default:
            return state;

    }
}