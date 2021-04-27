import { useReducer, useMemo, createContext, useContext, Dispatch } from 'react'

export type SearchState = {
  description: string
  isFullTime: boolean
  locationRadio: string
  locationText: string
}

export const SEARCH_EVENT = 'SEARCH_EVENT'

type Action = {
  type: 'SEARCH_EVENT'
  value: SearchState
}

const initialState: SearchState = {
  description: '',
  isFullTime: false,
  locationRadio: '',
  locationText: '',
}

const storeContext = createContext(initialState)
const dispatchContext = createContext(undefined)

const reducer = (state: SearchState, action: Action) => {
  switch (action.type) {
    case SEARCH_EVENT: {
      return {
        ...state,
        ...action.value,
      }
    }
    default:
      return state
  }
}
export const SearchProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState)

  // Storeが変化した時だけリレンダリングするようuseMemoを使用
  const contextValue: [SearchState, Dispatch<Action>] = useMemo(
    () => [store, dispatch],
    [store, dispatch]
  )

  return (
    <dispatchContext.Provider value={contextValue[1]}>
      <storeContext.Provider value={contextValue[0]}>
        {children}
      </storeContext.Provider>
    </dispatchContext.Provider>
  )
}

export const useSearchStore = (): SearchState => {
  return useContext(storeContext)
}

export const useSearchDispatch = (): Dispatch<Action> => {
  return useContext(dispatchContext)
}
