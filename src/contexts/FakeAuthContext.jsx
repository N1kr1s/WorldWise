import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'LOGIN', payload: FAKE_USER })
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
