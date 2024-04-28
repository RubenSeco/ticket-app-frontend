import React, { createContext } from 'react'
import { useState } from 'react'


export const UiContext = createContext()

export const UiProvider = ({ children }) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  const showMenu = () => {
    setIsMenuOpen(true)
  }
  const hideMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <UiContext.Provider value={{ isMenuOpen, showMenu, hideMenu }}>
        {children} 
    </UiContext.Provider>
  )
}
