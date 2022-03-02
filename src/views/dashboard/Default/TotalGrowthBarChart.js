import * as _ from 'lodash';
import * as cuid from 'cuid';
import * as PropTypes from 'prop-types';

// material-ui
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import ListSeminars from './ListSeminars';
import { gridSpacing, ORDER_BY, SORT_BY } from 'redux/constant';

const TotalGrowthBarChart = ({ isLoading, seminars, page, orderBy, sortBy }) => (
  <>
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
                <TextField
                  label="Order By"
                  select
                  value={orderBy.value}
                  onChange={(e) => orderBy.setValue(e.target.value)}
                  style={{ marginRight: '1em' }}
                >
                  {ORDER_BY.map((option) => (
                    <MenuItem key={cuid()} value={option} style={{ textTransform: 'capitalize' }}>
                      {option.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField label="Sort By" select value={sortBy.value} onChange={(e) => sortBy.setValue(e.target.value)}>
                  {SORT_BY.map((option) => (
                    <MenuItem key={cuid()} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {_.isEmpty(seminars) ? null : <ListSeminars seminars={seminars} page={page} />}
          </Grid>
        </Grid>
      </MainCard>
    )}
  </>
);

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
  seminars: PropTypes.shape({
    data: PropTypes.array,
    total: PropTypes.number
  }),
  page: PropTypes.shape({
    value: PropTypes.number,
    setValue: PropTypes.func
  }),
  orderBy: PropTypes.shape({
    value: PropTypes.string,
    setValue: PropTypes.func
  }),
  sortBy: PropTypes.shape({
    value: PropTypes.string,
    setValue: PropTypes.func
  })
};

export default TotalGrowthBarChart;
