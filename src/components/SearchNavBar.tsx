import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, IconButton, InputBase, Toolbar, Typography, Button } from "@mui/material"
import { Clear } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import PersonalInfoMenu from './PersonalInfoMenu';
import GoCart from './GoCart';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const SearchNavBar = ({ keyWord, setKeyWord }: { keyWord: string, setKeyWord: (keyWord: string) => void }) => {

  const location = useLocation()
  const isLoginPage = location.pathname.search('login') !== -1


  const handleClear = () => setKeyWord("")

  const handleSearchChange = (e: any) => setKeyWord(e.target.value)

  const handleKeyUp = (e: any) => e.keyCode == 27 && setKeyWord("")


  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <AppBar position="static">
          <Toolbar>
            {!isLoginPage && <PersonalInfoMenu />}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Luxury Shopping Center
            </Typography>
            {
              !isLoginPage && (
                <>
                  <GoCart />
                  <Search>
                    <SearchIconWrapper>
                      <Search />
                    </SearchIconWrapper>
                    <StyledInputBase
                      value={keyWord}
                      placeholder="Search…"
                      onChange={handleSearchChange}
                      onKeyUp={handleKeyUp}
                    />
                    <IconButton
                      onClick={handleClear}
                      sx={{ color: "white", visibility: keyWord ? "visible" : "hidden" }}>
                      <Clear />
                    </IconButton>
                  </Search>
                </>
              )
            }
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default SearchNavBar