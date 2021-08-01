import React, { createContext } from 'react'

interface AppContextInterface {
    token : string,
    setToken : (token : string) => void
}

export const AppContext = createContext<AppContextInterface | null>(null)
