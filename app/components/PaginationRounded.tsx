import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { PAGE_EVENT, usePageDispatch, usePageStore } from './hooks/pageContext'

type Props = {
  maxPage: number
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  })
)

const PaginationRounded: React.FC<Props> = (props) => {
  const classes = useStyles()

  const pageState = usePageStore()
  const pageDispatch = usePageDispatch()

  const handlePageChange = (e, v) => {
    pageDispatch({ type: PAGE_EVENT, value: v })
  }
  return (
    <div className={classes.root}>
      <Pagination
        count={props.maxPage}
        page={pageState.page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </div>
  )
}

export default PaginationRounded
