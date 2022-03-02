import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

// material-ui
import { Grid } from '@mui/material';

// project imports
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'redux/constant';
import { findAllSeminar as _findAllSeminar } from 'redux/actions/seminars';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = ({ currentUser, seminars, findAllSeminar }) => {
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('ASC');
  const [orderBy, setOrderBy] = useState('createdAt');

  const fetchAllSeminar = async ({ page, orderBy, sortBy }) => {
    console.log({ currentUser });
    setLoading(true);
    try {
      const pagination = { page, show: 6, orderBy, sortBy };
      const options = {};
      const userId = _.isEmpty(currentUser) ? '' : currentUser.id;
      await findAllSeminar(pagination, options, userId);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setPage(0);
      setSortBy('DESC');
      setOrderBy('createdAt');
    }
  }, []);

  useEffect(() => {
    fetchAllSeminar({ page, sortBy, orderBy });
  }, [page, sortBy, orderBy, currentUser]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart
              seminars={seminars}
              page={{ value: page, setValue: setPage }}
              orderBy={{ value: orderBy, setValue: setOrderBy }}
              sortBy={{ value: sortBy, setValue: setSortBy }}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Dashboard.propTypes = {
  currentUser: PropTypes.object,
  seminars: PropTypes.object,
  findAllSeminar: PropTypes.func
};

const mapStateToProps = (state) => ({ currentUser: state.currentUser, seminars: state.seminars });

const mapActionToProps = (dispatch) => ({
  findAllSeminar: (pagination, options, userId) => dispatch(_findAllSeminar(pagination, options, userId))
});

export default connect(mapStateToProps, mapActionToProps)(Dashboard);
