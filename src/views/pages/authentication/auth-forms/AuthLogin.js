import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import fetchAPI from 'utils/fetchAPI';
import { currentUserUpdate as _currentUserUpdate } from 'redux/actions/current-user';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ currentUser, currentUserUpdate, ...others }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!_.isEmpty(currentUser)) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { email, password } = values;
    try {
      const { user } = await fetchAPI('POST', { path: '/users/login', data: { email, password } });
      const data = { id: user.id, name: user.name, email: user.email };
      currentUserUpdate(data);
      setStatus({ success: true });
      setSubmitting(false);

      let goto = '/';
      if (!_.isEmpty(location.state?.from)) {
        goto = location.state.from;
      }

      navigate(goto);
    } catch (error) {
      console.log({ error });
      setStatus({ success: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', submit: null }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(25).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

FirebaseLogin.propTypes = {
  currentUser: PropTypes.object,
  currentUserUpdate: PropTypes.func
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

const mapActionToProps = (dispatch) => ({
  currentUserUpdate: (data) => dispatch(_currentUserUpdate(data))
});

export default connect(mapStateToProps, mapActionToProps)(FirebaseLogin);
