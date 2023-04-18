import * as React from 'react';
import NavBar from '../component/navBar.jsx';
import { useParams } from 'react-router-dom';
import callAPI from '../callAPI.jsx'
import { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// this is edit quiz profile function
function result () {
  const [barData, setBarData] = React.useState([
    { name: 'January', pv: 2400 },
    { name: 'February', pv: 1398 },
    { name: 'March', pv: 200 },
  ]);

  const BarChartExample = () => (
    <BarChart width={600} height={300} data={barData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="pv" fill="#8884d8" />
    </BarChart>
  );
  // this is the session id
  const { sessionid } = useParams();
  // const [result, setResult] = React.useState(null);
  function createData (name, score, total, rank) {
    return { name, score, total, rank };
  }

  const [rows, setRows] = React.useState([]);
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0),
  //   createData('Ice cream sandwich', 237, 9.0),
  //   createData('Eclair', 262, 16.0),
  //   createData('Cupcake', 305, 3.7),
  //   createData('Gingerbread', 356, 16.0),
  // ];

  // const handleError = () => {
  // setResult(0);
  // };
  const getResult = () => {
    callAPI('GET', `admin/session/${sessionid}/results`, localStorage.getItem('token'), '').then((data) => {
      data.results.forEach(awrArray => {
        console.log('data.results', awrArray);
        let totalScore = 0;
        let getScore = 0;
        awrArray.answers.forEach(awr => {
          console.log('inside', awr);
          totalScore += awr.score;
          if (awr.correct) {
            getScore += awr.score;
          }
        });
        setRows((prev) => [...prev, createData(awrArray.name, getScore, totalScore, 0)]);
        setBarData((prev) => [...prev, { name: awrArray.name, pv: 0 }]);
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
                  <TableCell align="right">score</TableCell>
            <TableCell align="right">total</TableCell>
            <TableCell align="right">Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </TableContainer>
          {/* barchart */}
        <BarChartExample />
        </div>
      </div>
    </>
  )
}

export default result;
