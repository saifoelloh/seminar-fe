import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import navigation from 'menu-items';
import { drawerWidth } from 'redux/constant';
import { SET_MENU } from 'redux/types';
import { checkUser as _checkUser } from 'redux/actions/current-user';

// assets
import { IconChevronRight } from '@tabler/icons';
import Sidebar from './Sidebar';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
      marginRight: '10px'
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px'
    }
  })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ currentUser, checkUser, toggleSideBar }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const [isLoading, setLoading] = useState(true);

  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();

  const checkingUser = async () => {
    if (_.isEmpty(currentUser)) {
      await checkUser();
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log({ leftDrawerOpened });
  }, [leftDrawerOpened]);

  useEffect(() => {
    checkingUser();
  }, []);

  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <Box sx={{ display: 'flex' }}>
      {isLoading ? null : (
        <>
          <CssBaseline />
          {/* header */}
          <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
              bgcolor: theme.palette.background.default,
              transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
            }}
          >
            <Toolbar>
              <Header currentUser={currentUser} handleLeftDrawerToggle={() => toggleSideBar(leftDrawerOpened)} />
            </Toolbar>
          </AppBar>

          {/* drawer */}
          {_.isEmpty(currentUser) ? null : <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={() => toggleSideBar(leftDrawerOpened)} />}

          {/* main content */}
          <Main theme={theme} open={leftDrawerOpened}>
            {/* breadcrumb */}
            <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
            <Outlet />
          </Main>
        </>
      )}
    </Box>
  );
};

MainLayout.propTypes = {
  currentUser: PropTypes.object,
  checkUser: PropTypes.func,
  toggleSideBar: PropTypes.func
};

const mapStateToProps = (state) => ({ currentUser: state.currentUser });
const mapActionsToProps = (dispatch) => ({
  checkUser: () => dispatch(_checkUser()),
  toggleSideBar: (val) => dispatch({ type: SET_MENU, opened: !val })
});

export default connect(mapStateToProps, mapActionsToProps)(MainLayout);
