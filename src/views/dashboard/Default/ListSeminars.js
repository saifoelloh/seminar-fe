import * as PropTypes from 'prop-types';
import * as cuid from 'cuid';
import { Grid, IconButton } from '@mui/material';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons';
import { gridSpacing } from 'redux/constant';
import ImgMediaCard from 'ui-component/cards/ImgMediaCard';
import { useEffect, useState } from 'react';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //
const ListSeminars = ({ seminars, page }) => {
  const [isNextDissabled, setIsNextDissabled] = useState(false);
  useEffect(() => {
    if (seminars.total <= 6) {
      setIsNextDissabled(true);
    }
    if (Math.round(seminars.total / 6) === page.value) {
      setIsNextDissabled(true);
    }
  }, [seminars]);

  return (
    <Grid container spacing={gridSpacing}>
      {seminars.data.map((seminar) => (
        <Grid key={cuid()} item md={4} xs={12}>
          <ImgMediaCard seminar={seminar} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <IconButton disabled={page.value === 0} onClick={() => page.setValue(page.value - 1)}>
          <IconChevronLeft />
        </IconButton>
        <IconButton disabled={isNextDissabled} onClick={() => page.setValue(page.value + 1)}>
          <IconChevronRight />
        </IconButton>
      </Grid>
    </Grid>
  );
};

ListSeminars.propTypes = {
  seminars: PropTypes.shape({
    data: PropTypes.array,
    total: PropTypes.number
  }),
  page: PropTypes.shape({
    value: PropTypes.number,
    setValue: PropTypes.func
  })
};

export default ListSeminars;
