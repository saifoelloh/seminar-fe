import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

// material-ui
import { Button, Grid, IconButton, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'redux/constant';
import { findAllSeminar as _findAllSeminar, removeSeminarById as _removeSeminarById } from 'redux/actions/create-seminar';
import SeminarTable from './SeminarTable';
import MainCard from 'ui-component/cards/MainCard';
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { Link } from 'react-router-dom';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Seminar = ({ currentUser, seminars, findAllSeminar, removeSeminarById }) => {
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('ASC');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [isNextDissabled, setIsNextDissabled] = useState(false);

  const fetchAllSeminar = async ({ page, orderBy, sortBy }) => {
    setLoading(true);
    try {
      const pagination = { page, show: 5, orderBy, sortBy };
      const options = { user: { id: currentUser.id } };
      await findAllSeminar(pagination, options);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  const removeById = async (seminarId) => {
    await removeSeminarById(seminarId);
    await fetchAllSeminar({ page, sortBy, orderBy });
  };

  useEffect(() => {
    if (isLoading) {
      setPage(0);
      setSortBy('DESC');
      setOrderBy('createdAt');
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (seminars.total <= 5) {
        setIsNextDissabled(true);
      }
      if (Math.round(seminars.total / 5) === page) {
        setIsNextDissabled(true);
      }
    }
  }, [seminars]);

  useEffect(() => {
    fetchAllSeminar({ page, sortBy, orderBy });
  }, [page, sortBy, orderBy, currentUser]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            {isLoading ? (
              <SkeletonTotalGrowthBarChart />
            ) : (
              <MainCard>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Grid container direction="column" spacing={1}>
                          <Grid item>
                            <Typography variant="subtitle2">List Of</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="h3">Seminar</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Button startIcon={<IconPlus />} component={Link} to="/seminar/create" variant="contained" color="primary">
                          NEW
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {_.isEmpty(seminars) ? null : <SeminarTable seminars={seminars} removeSeminarById={removeById} />}
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}>
                        <IconChevronLeft />
                      </IconButton>
                      <IconButton disabled={isNextDissabled} onClick={() => setPage(page + 1)}>
                        <IconChevronRight />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </MainCard>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Seminar.propTypes = {
  currentUser: PropTypes.object,
  seminars: PropTypes.object,
  findAllSeminar: PropTypes.func
};

const mapStateToProps = (state) => ({ currentUser: state.currentUser, seminars: state.createSeminar });

const mapActionToProps = (dispatch) => ({
  findAllSeminar: (pagination, options) => dispatch(_findAllSeminar(pagination, options)),
  removeSeminarById: (seminarId) => dispatch(_removeSeminarById(seminarId))
});

export default connect(mapStateToProps, mapActionToProps)(Seminar);
