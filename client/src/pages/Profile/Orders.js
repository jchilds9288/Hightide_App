/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, task, givenTo, pool, points) {
  return { id, date, task, givenTo, pool, points };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Hung up towel', 'Sloane', 'Chores', 1),
  createData(1, '16 Mar, 2019', 'Woke up early', 'Sloane', 'Productivity', 5),
  createData(2, '16 Mar, 2019', 'Made breakfast', 'Sloane', 'Self Care', 3),
  createData(3, '16 Mar, 2019', 'Worked out', 'Sloane', 'Self Care', 3),
  createData(4, '15 Mar, 2019', 'Phonecall with friend', 'Sloane', 'Friendship', 5),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Tasks</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Given To</TableCell>
            <TableCell>Pool</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.task}</TableCell>
              <TableCell>{row.givenTo}</TableCell>
              <TableCell>{row.pool}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
