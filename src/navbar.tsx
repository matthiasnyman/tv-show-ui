import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  TextField,
} from '@mui/material';

interface NavProps {
  searchText: string;
  handleChange: (e: any) => void;
}

const Navbar = (props: NavProps): JSX.Element => {
  const { searchText, handleChange } = props;

  return (
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <IconButton edge="start" style={{color: "black"}} aria-label="menu">
          Logo
        </IconButton>
        <Typography variant="h5" style={{color: "black"}} className="title">
          Series
        </Typography>
        <TextField
          label="Search field"
          type="search"
          variant="standard"
          className="search-box"
          value={searchText}
          onChange={handleChange}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
