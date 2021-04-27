import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {
  INPUT_EVENT,
  useInputDispatch,
  useInputStore,
} from './hooks/inputContext'
import { SEARCH_EVENT, useSearchDispatch } from './hooks/searchContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '60%',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
    input: {
      flex: 1,
      width: '50%',
      border: 0,
    },
    //style for font size
    resize: {
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
      fontSize: 18,
    },
    iconButton: {
      padding: 14,
      width: 180,
      [theme.breakpoints.down('sm')]: {
        width: 80,
      },
    },
  })
)

const SearchTop: React.FC = () => {
  const classes = useStyles()

  const inputState = useInputStore()
  const inputDispatch = useInputDispatch()
  const searchDispatch = useSearchDispatch()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    inputDispatch({
      type: INPUT_EVENT,
      target: e.target.name,
      value: e.target.value,
    })
  }
  const handleSearch = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault()
    searchDispatch({ type: SEARCH_EVENT, value: inputState })
  }

  return (
    <>
      <div className="h-32 p-2 rounded-lg bg-background flex justify-center items-center">
        <Paper component="form" className={classes.root}>
          <TextField
            name="description"
            id="outlined-adornment-amount"
            className={classes.input}
            label=""
            variant="outlined"
            placeholder="Title, companies, expertise or benefits"
            InputProps={{
              startAdornment: (
                <span className="material-icons text-gray-400 mr-2">
                  work_outline
                </span>
              ),
              classes: {
                input: classes.resize,
              },
            }}
            value={inputState.description}
            onChange={(e) => handleChange(e)}
            onKeyPress={(e) => {
              if (e.key == 'Enter') {
                handleSearch(e)
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.iconButton}
            onClick={(e) => handleSearch(e)}
          >
            Search
          </Button>
        </Paper>
      </div>
    </>
  )
}

export default SearchTop
