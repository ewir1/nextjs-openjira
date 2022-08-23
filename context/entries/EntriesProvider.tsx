import React, { FC, ReactNode, useEffect, useReducer } from 'react'
// import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext } from './EntriesContext'
import { entriesReducer } from './entriesReducer'

export interface EntriesState {
   entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [],
}

type Props = {
   children: ReactNode | ReactNode[]
}

export const EntriesProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
   const { enqueueSnackbar } = useSnackbar();

   const addNewEntry = async (description: string) => {
      // const newEntry: Entry = {
      //    _id: uuidv4(),
      //    description,
      //    createAt: Date.now(),
      //    status: 'pending'
      // };

      try {
         const { data } = await entriesApi.post<Entry>('/entries', { description });
         dispatch({ type: '[Entry] - Add Entry', payload: data });
      } catch (error) {
         console.log(error);
      }

   }

   const updateEntry = async ({ _id, description, status }: Entry, showSnackbar: boolean = false) => {
      try {
         const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
         dispatch({ type: '[Entry] - Entry-Updated', payload: data });
         if (showSnackbar) {
            enqueueSnackbar('Entrada actualizada', {
               variant: 'success',
               autoHideDuration: 1500,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               }
            });
         }
      } catch (error) {
         console.log({ error });
      }
   }

   const refreshEntries = async () => {
      const { data } = await entriesApi.get<Entry[]>('/entries');
      // console.log(data);
      dispatch({ type: '[Entry] - Refresh-Data', payload: data });
   }

   useEffect(() => {
      refreshEntries();
   }, [])


   return (
      <EntriesContext.Provider value={{
         ...state,
         addNewEntry,
         updateEntry,
      }}>
         {children}
      </EntriesContext.Provider>
   )
}