import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';

// assets

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ currentUser }) => {
  const theme = useTheme();
  const isUserEmpty = _.isEmpty(currentUser);

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
      </Box>

      {/* header search */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      {isUserEmpty ? (
        <Button component={Link} to="/login" disableElevation variant="contained" color="secondary">
          Sign In
        </Button>
      ) : (
        <ProfileSection />
      )}
    </>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object
};

export default Header;
