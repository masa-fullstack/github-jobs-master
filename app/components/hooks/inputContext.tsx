import { useReducer, useMemo, createContext, useContext, Dispatch } from 'react'

type inputState = {
  description: string
  isFullTime: boolean
  locationRadio: string
  locationText: string
}

export const INPUT_EVENT = 'INPUT_EVENT'

type Action = {
  type: 'INPUT_EVENT'
  target: keyof inputState | string
  value: string | boolean
}

const initialState: inputState = {
  description: '',
  isFullTime: false,
  locationRadio: '',
  locationText: '',
}

const storeContext = createContext(initialState)
const dispatchContext = createContext(undefined)

const reducer = (state: inputState, action: Action) => {
  switch (action.type) {
    case INPUT_EVENT: {
      const newValues = state
      newValues[action.target.toString()] = action.value
      return {
        ...newValues,
      }
    }
    default:
      return state
  }
}
export const InputProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState)

  // Storeが変化した時だけリレンダリングするようuseMemoを使用
  const contextValue: [inputState, Dispatch<Action>] = useMemo(
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

export const useInputStore = (): inputState => {
  return useContext(storeContext)
}

export const useInputDispatch = (): Dispatch<Action> => {
  return useContext(dispatchContext)
}
