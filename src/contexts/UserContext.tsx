import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export interface State {
  token?: string
  details?: any
}

export interface UserContextDefault {
  state: State
  setState: Dispatch<SetStateAction<State>>
}

interface UserContextProps {
  children: ReactNode
}

const initialState = {
  state: {},
  setState: () => {}
}

export const UserContext = createContext<UserContextDefault>(initialState)

const UserContextProvider = ({children}: UserContextProps) => {
  const [state, setState] = useState<State>(initialState.state)

  return (
    <UserContext.Provider value={{state, setState}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

export const useLogin = () => useContext(UserContext)