import * as PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { IconTrash } from '@tabler/icons';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const EnrolledSeminarItem = ({ seminar, removeEvent }) => {
  const theme = useTheme();

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {seminar.title.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <IconButton onClick={removeEvent} color="secondary">
                    <IconTrash />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{seminar.date}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1.5 }} />
    </>
  );
};

EnrolledSeminarItem.propTypes = {
  seminar: PropTypes.object,
  removeEvent: PropTypes.func
};

export default EnrolledSeminarItem;
