import * as actionTypes from './actionsTypes';
import Axios from 'axios';

export const authStart = () => {
    console.log('Trexei i AUTH_START')
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = token => {
    console.log('trexei i AUTH SUCCESS ME TOKEN ',token)
	return {
		type: actionTypes.AUTH_SUCCESS,
		token:token
	};
}

export const authFail = error => {
    console.log('Trexei i AUTH_FAIL me error ',error)
	return {
		type: actionTypes.AUTH_FAIL,
		error:error
	};
}

export const logout = () => {
    console.log('TREXEI H LOGOUT ACTION me par ' )
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('username')
    localStorage.removeItem('userid')
    console.log('removed user kai expiration date ')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    console.log('Trexei i checkAuthTimeOut me expiration date ',expirationTime)
	return dispatch => {
        console.log('3ekina i metrisi')
		setTimeout(()=>{
            console.log('---------------------------TELOS XRONO LOGOUT-----------------------')
			dispatch(logout());
		},expirationTime*1000)
	};
}

export const authLogin = (username,password) => {
    console.log('Trexei i authLogin me ta credentials: ')
    console.log('username: ', username)
    console.log('password: ', password)
    return dispatch => {
        dispatch(authStart());
        Axios.post('http://localhost:8000/api-token-auth/',{
            username:username,
            password:password
        })
        .then(res=>{

            Axios.get('http://localhost:8000/api/users/')
                .then(response => {
                    console.log('OLLOI OI USERS',response.data.filter(r => r.username === username)[0].id)
                    localStorage.setItem('userid',response.data.filter(r => r.username === username)[0].id);
                    console.log('apantisi gia to login: ', res)
                    const token = res.data.token;
                    const expirationDate = new Date(new Date().getTime + 3600 * 1000);
                    localStorage.setItem('token',token);
                    localStorage.setItem('expirationDate',expirationDate);
                    localStorage.setItem('username',username)
                    console.log('LOCALSTORAGE 3333333333333333333333333333333333333333333',localStorage)
                    dispatch(authSuccess(token));
                    dispatch(checkAuthTimeout(3600))
                    
                })
                .catch(error => {
                    console.log('to lathos einai : ',error)
                    return error
                
                })

        })
        .catch(err => {
            console.log('ERROR-------------------------------//////////////////',err)
            dispatch(authFail(err))
        })
    }
}


export const authSignup = (username,password1,password2,dep,year) => {
    return dispatch => {
        //dispatch(authStart());
        Axios.post('http://localhost:8000/rest-auth/registration/',{
            "username": username,
            "email": "gio@asd.com",
            "department": dep,
            "date_of_birth": year,
            "password1": password1,
            "password2": password2
    
        })
        .then(res=>{
            //const token = res.data.key;
            //const expirationDate = new Date(new Date().getTime + 3600 * 1000);
            //localStorage.setItem('token',token);
            //localStorage.setItem('expirationDate',expirationDate);
           // dispatch(authSuccess(token));
            //dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authCheckState = () => {
    console.log('eimai stin authcheck ')
	return dispatch => {
        const token = localStorage.getItem('token');
        console.log('token ',token)
        
        if(token === undefined || token === null){
            console.log('eimai stin authcheck kai kanei logout gt token einai UNDEFINED')
			dispatch(logout())
		} else{
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
            console.log('expirationdate',expirationDate)
            if(expirationDate <= new Date()){
                console.log('eimai stin authcheck kai kanei logout gt ELI3E')
                dispatch(logout())
                
			} else {
                console.log('eimai stin authcheck kai OLA komple kai kalw checkAuthTimeout')
                dispatch(authSuccess(token))
				dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000))
			}
		}
	}
}