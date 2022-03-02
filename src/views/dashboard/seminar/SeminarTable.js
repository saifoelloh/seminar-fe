import * as PropTypes from 'prop-types';
import * as cuid from 'cuid';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons';
import { Link } from 'react-router-dom';

function SeminarTable({ seminars, removeSeminarById }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Quota</TableCell>
            <TableCell align="center">Attendace</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seminars.data.map((seminar) => (
            <TableRow key={cuid()} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {seminar.title}
              </TableCell>
              <TableCell align="center">{seminar.date}</TableCell>
              <TableCell align="center">{seminar.quota}</TableCell>
              <TableCell align="center">{seminar.attendance.length}</TableCell>
              <TableCell align="center">
                <IconButton component={Link} to={`/seminar/update/${seminar.id}`}>
                  <IconEdit />
                </IconButton>
                <IconButton disabled={seminar.attendance.length > 0} onClick={() => removeSeminarById(seminar.id)}>
                  <IconTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SeminarTable.propTypes = {
  seminars: PropTypes.shape({
    data: PropTypes.array,
    total: PropTypes.number
  }),
  removeSeminarById: PropTypes.func
};

export default SeminarTable;
