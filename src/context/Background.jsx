import {useState, createContext} from 'react'

export const Darkmode = createContext({mode: false ,setMode: () => {}})

export const Background = ({children}) => {
    const [mode, setMode] = useState(false)
    return (
        <Darkmode.Provider value={{mode, setMode}}>
            {children}
        </Darkmode.Provider>
    )
}
