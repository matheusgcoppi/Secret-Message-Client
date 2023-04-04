import {createContext} from 'react'

export const UserContext = createContext({ user: { accessToken: null, refreshToken: null } });