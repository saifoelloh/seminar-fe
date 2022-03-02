import * as _ from 'lodash';
import * as cuid from 'cuid';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';

// material-ui
import { CardContent, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'redux/constant';
import { getAllEvent as _getAllEvent, removeEvent as _removeEvent } from 'redux/actions/events';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import EnrolledSeminarItem from './EnrolledSeminarItem';

const PopularCard = ({ isLoading, currentUser, events, seminars, getAllEvent, removeEvent }) => {
  const handleRemoveEvent = async (seminarId) => {
    await removeEvent(seminarId);
    await getAllEvent();
  };

  useEffect(() => {
    if (!_.isEmpty(currentUser)) {
      getAllEvent();
    }
  }, [seminars]);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Enrolled Seminar</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {_.isEmpty(events)
                  ? null
                  : events.map((seminar) => (
                      <EnrolledSeminarItem key={cuid()} seminar={seminar} removeEvent={() => handleRemoveEvent(seminar.id)} />
                    ))}
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
  events: PropTypes.array,
  seminars: PropTypes.object,
  currentUser: PropTypes.object,
  getAllEvent: PropTypes.func,
  removeEvent: PropTypes.func
};

const mapStateToProps = (state) => ({ events: state.events, currentUser: state.currentUser, seminars: state.seminars });
const mapActionsToProps = (dispatch) => ({
  getAllEvent: () => dispatch(_getAllEvent()),
  removeEvent: (seminarId) => dispatch(_removeEvent(seminarId))
});

export default connect(mapStateToProps, mapActionsToProps)(PopularCard);
