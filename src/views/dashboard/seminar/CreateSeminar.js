import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { createSeminar as _createSeminar } from 'redux/actions/create-seminar';

import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useTheme } from '@emotion/react';

// ==============================|| SAMPLE PAGE ||============================== //

const CreateSeminar = ({ currentUser, createSeminar }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const { title, quota, date } = values;
    try {
      await createSeminar({ title, quota, date: new Date(date), userId: currentUser.id });
      setStatus({ success: true });
      setSubmitting(false);
      navigate('/seminar');
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  return (
    <MainCard title="Sample Card">
      <Formik
        initialValues={{
          title: '',
          date: '',
          quota: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(50).required('Name is required'),
          date: Yup.date().required('Date is required'),
          quota: Yup.number().moreThan(0).lessThan(101).required('Quota is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.title && errors.title)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-title-register">Title</InputLabel>
              <OutlinedInput
                id="outlined-adornment-title-register"
                type="title"
                value={values.title}
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.title && errors.title && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.title}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.quota && errors.quota)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-quota-register">Quota</InputLabel>
              <OutlinedInput
                id="outlined-adornment-quota-register"
                type="number"
                value={values.quota}
                name="quota"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.quota && errors.quota && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.quota}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.date && errors.date)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-date-register">Date</InputLabel>
              <OutlinedInput
                id="outlined-adornment-date-register"
                type="date"
                value={values.date}
                name="date"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.date && errors.date && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.date}
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
                  Sign up
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

CreateSeminar.propTypes = {
  currentUser: PropTypes.object,
  createSeminar: PropTypes.func
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

const mapActionToProps = (dispatch) => ({
  createSeminar: (body) => dispatch(_createSeminar(body))
});

export default connect(mapStateToProps, mapActionToProps)(CreateSeminar);
