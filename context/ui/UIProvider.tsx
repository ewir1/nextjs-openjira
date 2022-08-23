import React, { FC, ReactNode, useReducer } from 'react'
import { UIContext } from './UIContext'
import { uiReducer } from './uiReducer'

export interface UIState {
   sidemenuOpen: boolean;
   isAddingEntry: boolean;
   isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
   sidemenuOpen: false,
   isAddingEntry: false,
   isDragging: false,
}

type Props = {
   children: ReactNode | ReactNode[]
}

export const UIProvider: FC<Props> = ({ children }) => {

   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const openSideMenu = () => {
      dispatch({ type: 'UI - Open Sidebar' })
   }

   const closeSideMenu = () => {
      dispatch({ type: 'UI - Close Sidebar' })
   }

   const setIsAddingEntry = (isAdding: boolean) => {
      dispatch({ type: 'UI - Set IsAddingEntry', payload: isAdding })
   }

   const startDragging = () => {
      dispatch({ type: 'UI - Start Dragging' })
   }

   const endDragging = () => {
      dispatch({ type: 'UI - End Dragging' })
   }

   return (
      <UIContext.Provider value={{
         ...state,
         openSideMenu,
         closeSideMenu,
         setIsAddingEntry,
         startDragging,
         endDragging
      }}>
         {children}
      </UIContext.Provider>
   )
}