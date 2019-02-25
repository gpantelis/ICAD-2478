import  {FETCH_COMMEND_SUCCESS} from '../actions/getPostsActions';

export default function commentReducer(state= null,action) {

    console.log('=========================================================================')
    console.log('---------------------------COMMEND REDUCER-------------------------------')
    console.log('=========================================================================')
    console.log('Action Type: ',action.type)
    console.log('-------------------------------------------------------------------------')
    console.log('Action payload: ',action.payload)
    console.log('=========================================================================')
    switch(action.type){
        case FETCH_COMMEND_SUCCESS:
        console.log('-------------------------Mpika kai ta stelnw-----------------------------')
        console.log('=========================================================================')
                 return  action.payload;
        default:
            return state;

    }
}