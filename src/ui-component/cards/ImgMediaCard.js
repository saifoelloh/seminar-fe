import * as PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { useNavigate } from 'react-router';
import { enrollSeminar as _enrollSeminar, findAllSeminar as _findAllSeminar } from 'redux/actions/seminars';

function ImgMediaCard({ seminar, currentUser, enrollSeminar, findAllSeminar }) {
  const { id, title, description } = seminar;
  const navigate = useNavigate();

  const goTo = async () => {
    if (_.isEmpty(currentUser)) {
      navigate('/login', { replace: true, state: { from: '/' } });
    } else {
      await enrollSeminar(id, currentUser.id);
      await findAllSeminar(currentUser.id);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ border: '0.3px solid' }}>
      <CardMedia
        component="img"
        alt="pexel random image"
        height="140"
        image="https://images.unsplash.com/photo-1638836018340-d7c65966e8e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8OVFWUkVIOUEzRFV8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth size="small" onClick={goTo} variant="contained">
          Enroll
        </Button>
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  seminar: PropTypes.object,
  currentUser: PropTypes.object,
  enrollSeminar: PropTypes.func,
  findAllSeminar: PropTypes.func
};

const mapStateToProps = (state) => ({ currentUser: state.currentUser });
const mapActionToProps = (dispatch) => ({
  enrollSeminar: (id) => dispatch(_enrollSeminar(id)),
  findAllSeminar: (id) => dispatch(_findAllSeminar(null, null, id))
});

export default connect(mapStateToProps, mapActionToProps)(ImgMediaCard);
