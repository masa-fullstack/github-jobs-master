import { useReducer, useMemo, createContext, useContext, Dispatch } from 'react'

type State = {
  page: number
}

export const PAGE_EVENT = 'PAGE_EVENT'

type Action = {
  type: 'PAGE_EVENT'
  value: number
}

const initialState: State = {
  page: 1,
}

const storeContext = createContext(initialState)
const dispatchContext = createContext(undefined)

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case PAGE_EVENT: {
      return {
        ...state,
        page: action.value,
      }
    }
    default:
      return state
  }
}
export const PageProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState)

  // Storeが変化した時だけリレンダリングするようuseMemoを使用
  const contextValue: [State, Dispatch<Action>] = useMemo(
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

export const usePageStore = (): State => {
  return useContext(storeContext)
}

export const usePageDispatch = (): Dispatch<Action> => {
  return useContext(dispatchContext)
}
