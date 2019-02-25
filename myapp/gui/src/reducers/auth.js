import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';
import initialState from './initialState';

const authStart = (state,action) => {
	console.log('Eimai sto fakelo reducer.auth kai trexei to AUTHSTART')
	return updateObject(state,{
		error:null,
		loading:true
	});
}

const authSuccess = (state ,action) => {
	let newObject = updateObject(state,{
		token:action.token,
		error:null,
		loading:false
	});

	console.log('Eimai sto fakelo reducer.auth kai trexei to AUTHSUCCESS', newObject)
	console.log('Local storage',localStorage)
	return newObject
}
const authFail = (state,action) => {
	console.log('Eimai sto fakelo reducer.auth kai trexei to AUTHFAIL')
	return updateObject(state,{
		error:action.error,
		loading:false
	});
}

const authLogout = (state,action) => {
	console.log('Eimai sto fakelo reducer.auth kai trexei to AUTHLOGOUT')
	return updateObject(state,{
		token:null
	});
}

const reducer = (state=initialState,action) =>{
	console.log('-----------TREXEI TO reducer me action type: ',action.type)
	switch(action.type){
		case actionTypes.AUTH_START: return authStart(state,action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
		case actionTypes.AUTH_FAIL: return authFail(state,action);
		case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
		default:
			return state;
	}
}

export default reducer;
