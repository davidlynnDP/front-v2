import { FC, ReactNode, useReducer, useState } from 'react';
import { AuthContext } from './AuthContext';
import { SignInParams, SignUpParams, UpdateUserParams } from '../../domain/interfaces';
import { authReducer } from './authReducer';
import { AuthRepository } from '../../domain/repositories';
import { PharmaRenderAuthRepositoyImpl } from '../../infrastructure/repositories/pharmaRenderAuthRepositoyImpl';
import { User } from '../../domain/models';

enum AuthStatus {
    NotAuthenticated = 'not-authenticated',
    Authenticated = 'authenticated',
}

export interface AuthState {
    user: User;
    status: AuthStatus;
}

const AUTH_INITIAL_STATE: AuthState = {
    user: {
        id: '',
        username: '',
        email: '',
        isActive: false,
        token: ''
    },
    status: AuthStatus.NotAuthenticated,
};



interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

    const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    
    const authRepository: AuthRepository = new PharmaRenderAuthRepositoyImpl();

    const signIn = async(signInParams: SignInParams) => {
        try {
            setIsLoading(true);
            const user = await authRepository.signIn( signInParams );
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Sign In', payload });
            setIsLoading(false);
        } catch ( error ) {
            console.log( error );
        }
    };

    const signUp = async(signUpParams: SignUpParams) => {
        try {
            setIsLoading(true);
            const user = await authRepository.signUp( signUpParams );
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Sign Up', payload });
            setIsLoading(false);
        } catch ( error ) {
            console.log( error );
        }
    };

    const reNewToken = async() => {
        try {
            setIsLoading(true);
            const user = await authRepository.reNewToken();
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Renew Token', payload });
            setIsLoading(false);
        } catch ( error ) {
            console.log( error );
        }
    };

    const findUserById = async(id: string) => {
        try {
            return await authRepository.findUserById( id );
        } catch ( error ) {
            console.log( error );
        }
    };

    const updateUser = async(id: string, updateUserParams: UpdateUserParams) => {
        try {
            setIsLoading(true);
            const user = await authRepository.updateUser( id, updateUserParams );
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Update User', payload });
            setIsLoading(false);
        } catch ( error ) {
            console.log( error );
        }
    };

    const deleteUser = async(id: string) => {
        try {
            setIsLoading(true);
            const user = await authRepository.deleteUser( id );
            const payload: AuthState = {
                user,
                status: AuthStatus.Authenticated
            }
            dispatch({ type: '[Auth] - Delete User', payload });
            setIsLoading(false);
        } catch ( error ) {
            console.log( error );
        }
    };

    const logout = () => {
        setIsLoading(true);
        dispatch({ type: '[Auth] - Logout' });
        localStorage.removeItem('token');
        localStorage.removeItem('tokenIssuedAt');
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            isLoading,

            signIn,
            signUp,
            reNewToken,
            findUserById,
            updateUser,
            deleteUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}