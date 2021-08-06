import { Button, withStyles } from "@material-ui/core";
import { blue } from '@material-ui/core/colors';

const SearchButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    margin: 5
  },
}))(Button);

export default SearchButton;