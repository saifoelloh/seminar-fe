import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useState, useEffect } from 'react';

import MainCard from 'ui-component/cards/MainCard';
import { useNavigate, useParams } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useTheme } from '@emotion/react';
import { getSeminarById as _getSeminarById, updateSeminarById as _updateSeminarById } from 'redux/actions/seminars';

// ==============================|| SAMPLE PAGE ||============================== //

const SeminarUpdate = ({ currentUser, updateSeminarById, getSeminarById }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [seminar, setSeminar] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    const id = params.seminarId;
    const { title, quota, date } = values;
    try {
      await updateSeminarById(id, { id, title, quota, date: new Date(date) });
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

  const fetchSeminarById = async (seminarId) => {
    const data = await getSeminarById(seminarId);
    setSeminar(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      fetchSeminarById(params.seminarId);
    }
  }, []);

  return (
    <MainCard title="Sample Card">
      {isLoading ? null : (
        <Formik
          initialValues={{
            title: seminar.title,
            date: seminar.date,
            quota: seminar.quota,
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
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Sign up
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </MainCard>
  );
};

SeminarUpdate.propTypes = {
  currentUser: PropTypes.object,
  getSeminarById: PropTypes.func,
  updateSeminarById: PropTypes.func
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

const mapActionToProps = (dispatch) => ({
  getSeminarById: (seminarId) => dispatch(_getSeminarById(seminarId)),
  updateSeminarById: (seminarId, data) => dispatch(_updateSeminarById(seminarId, data))
});

export default connect(mapStateToProps, mapActionToProps)(SeminarUpdate);
