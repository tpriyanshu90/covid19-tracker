import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { fetchCountryData } from '../../api';
import styles from './PaginatedTable.module.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

class PaginatedTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            countryName: "",
            filteredList: [],
            countriesList: [],
            rows : [],
            initialRows : [],
            columns : [
                {id: 'Name', label: 'Name'},
                {id: 'Confirmed', label: 'Confirmed'},
                {id: 'NewConfirmed', label: 'New Confirmed'},
                {id:'Recovered', label: 'Recovered'},
                {id: 'NewRecovered', label: 'New Recovered'},
                {id: 'Deaths', label: 'Deaths'},
                {id: 'NewDeaths', label: 'New Deaths'}
            ]
        }
    }
    createData = (Name, Confirmed, NewConfirmed, Recovered,NewRecovered, Deaths, NewDeaths) => {
        return { Name, Confirmed, NewConfirmed, Recovered,NewRecovered, Deaths, NewDeaths }
    }
    async componentDidMount(){
        const countriesList = await fetchCountryData();
        console.log(countriesList);
        let rowsFetched = countriesList.map((rec)=> {
            return this.createData(rec.Country,rec.TotalConfirmed, rec.NewConfirmed, rec.TotalRecovered, rec.NewRecovered, rec.TotalDeaths, rec.NewDeaths);
        })
        this.setState({countriesList:countriesList,filteredList:countriesList, rows: rowsFetched, initialRows: rowsFetched});
    }
    handleCountryChange = (e) =>{
        this.setState({countryName: e.target.value},()=>{
            let filteredList = this.state.countriesList.filter(countryObj => {
                return countryObj.Country.toLowerCase().includes(this.state.countryName.toLowerCase());
            });
            if((!this.state.filteredList.length && !this.state.countryName)){
                this.setState({filteredList: this.state.countriesList, rows: this.state.initialRows});
            } else{
                let rowsFetched = filteredList.map((rec)=> {
                    return this.createData(rec.Country,rec.TotalConfirmed, rec.NewConfirmed, rec.TotalRecovered, rec.NewRecovered, rec.TotalDeaths, rec.NewDeaths);
                })
                this.setState({filteredList: filteredList,rows: rowsFetched});
            }
        });
    }
    render(){
        return (
            <div>
                <h2>Get country specific data</h2>
                <input  type="text"
                        value={this.state.countryName}
                        onChange={this.handleCountryChange}
                        placeholder={"Search country"}
                        className={styles.formControl}
                />
                <br/>
                {
                    (this.state.filteredList.length>0)? 
                    <div>
                        <PaginationTable rows={this.state.rows} columns={this.state.columns}/>
                    </div>
                    :
                    <div>
                        <p className={styles.alertPrimary}>No Country found</p>
                    </div>
                }
                
            </div>
        );
    }
}
function PaginationTable(props) {
  const {rows,columns} = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default PaginatedTable;