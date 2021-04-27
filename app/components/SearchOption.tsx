import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import {
  INPUT_EVENT,
  useInputDispatch,
  useInputStore,
} from './hooks/inputContext'
import { SEARCH_EVENT, useSearchDispatch } from './hooks/searchContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      width: '90%',
    },
    iconButton: {
      padding: 10,
    },
  })
)

const SearchOption: React.FC = () => {
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

  const handleChangeBoolean = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDispatch({
      type: INPUT_EVENT,
      target: e.target.name,
      value: e.target.checked,
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
    <div className="p-2">
      <FormControlLabel
        control={
          <Checkbox
            name="isFullTime"
            checked={inputState.isFullTime}
            onChange={(e) => handleChangeBoolean(e)}
            color="primary"
          />
        }
        label="Full time"
      />
      <div className="mt-5 mb-2 text-lg font-bold text-gray-400">Location</div>

      <TextField
        name="locationText"
        className={classes.input}
        label=""
        variant="outlined"
        placeholder="City, state, zip code or country"
        InputProps={{
          startAdornment: (
            <span className="material-icons text-gray-400 mr-2">public</span>
          ),
        }}
        defaultValue={inputState.locationText}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => {
          if (e.key == 'Enter') {
            handleSearch(e)
          }
        }}
      />

      <div className="mt-5"></div>
      <RadioGroup
        aria-label="LocationRadio"
        name="locationRadio"
        value={inputState.locationRadio}
        onChange={(e) => handleChange(e)}
      >
        <FormControlLabel value="London" control={<Radio />} label="London" />
        <FormControlLabel
          value="Amsterdam"
          control={<Radio />}
          label="Amsterdam"
        />
        <FormControlLabel
          value="New York"
          control={<Radio />}
          label="New York"
        />
        <FormControlLabel value="Berlin" control={<Radio />} label="Berlin" />
      </RadioGroup>
    </div>
  )
}

export default SearchOption
