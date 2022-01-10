import React from 'react';
import './App.css';
import { Paper, Typography, Box, Collapse, Table } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface tableProps {
  episodes: any[];
}

function Row(props: any) {
  const { name, number, runtime, airdate, summary } = props.row;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="center">{number}</TableCell>
        <TableCell align="center">{runtime}</TableCell>
        <TableCell align="center">{airdate}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Summary
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: summary }}></div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const EpisodeTable = (props: tableProps): JSX.Element => {
  return (
    <TableContainer component={Paper} className="episode-table">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Episode</TableCell>
            <TableCell align="right">runtime</TableCell>
            <TableCell align="right">airdate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.episodes.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EpisodeTable;
