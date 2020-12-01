import React from 'react';

import { fetchCountryData } from '../../api';
import styles from './CountryLists.module.css';

class CountryLists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            countryName: "",
            filteredList: [],
            countriesList: []
        }
    }
    async componentDidMount(){
        const countriesList = await fetchCountryData();
        this.setState({countriesList:countriesList,filteredList:countriesList});
    }
    handleCountryChange = (e) =>{
        this.setState({countryName: e.target.value},()=>{
            let filteredList = this.state.countriesList.filter(countryObj => {
                return countryObj.Country.toLowerCase().includes(this.state.countryName.toLowerCase());
            });
            if((!this.state.filteredList.length && !this.state.countryName)){
                this.setState({filteredList: this.state.countriesList});
            } else{
                this.setState({filteredList: filteredList});
            }
        });
    }

    sortData = (filterName) => {
        let sortedFilteredList = this.state.filteredList.sort((country1, country2) => {
            if(filterName=="New Confirmed"){
                if(country1.NewConfirmed==country2.NewConfirmed){
                    return (country1.Country>country2.Country)?1:-1;
                } else{
                    return (country1.NewConfirmed>country2.NewConfirmed)?1:-1;
                }
            } else if(filterName=="Confirmed"){
                if(country1.TotalConfirmed==country2.TotalConfirmed){
                    return (country1.Country>country2.Country)?1:-1;
                } else{
                    return (country1.TotalConfirmed>country2.TotalConfirmed)?1:-1;
                }
            } else if(filterName=="New Deaths"){
                if(country1.NewDeaths==country2.NewDeaths){
                    return (country1.Country>country2.Country)?1:-1;
                } else{
                    return (country1.NewDeaths>country2.NewDeaths)?1:-1;
                }
            } else if(filterName=="Deaths"){
                if(country1.TotalDeaths==country2.TotalDeaths){
                    return (country1.Country>country2.Country)?1:-1;
                } else{
                    return (country1.TotalDeaths>country2.TotalDeaths)?1:-1;
                }
            } else if(filterName=="New Recovered"){
                if(country1.NewRecovered==country2.NewRecovered){
                    return (country1.Country>country2.Country)?1:-1;
                } else{
                    return (country1.NewRecovered>country2.NewRecovered)?1:-1;
                }
            } else if(filterName=="Recovered"){
                if(country1.TotalRecovered==country2.TotalRecovered){
                    return (country1.Country>country2.Country)?1:-1;
                } else{
                    return (country1.TotalRecovered>country2.TotalRecovered)?1:-1;
                }
            } else{
                return (country1.Country>country2.Country)?1:-1;
            }
        });
        this.setState({filteredList: sortedFilteredList});
    }
    render(){
        return (
            <div className={styles.countryListContainer}>
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
                        <div className={styles.tableDiv}>
                            <table className={styles.countryTables}>
                                <thead>
                                    <tr className={styles.tableHead}>
                                        <th title="Click to sort" onClick={() => this.sortData("Name")}>Name <span className={styles.arrowUpDown}>↕</span></th>
                                        <th title="Click to sort" onClick={() => this.sortData("Confirmed")}>Confirmed <span className={styles.arrowUpDown}>↕</span></th>
                                        <th title="Click to sort" onClick={() => this.sortData("New Confirmed")}>New Confirmed <span className={styles.arrowUpDown}>↕</span></th>
                                        <th title="Click to sort" onClick={() => this.sortData("Recovered")}>Recovered <span className={styles.arrowUpDown}>↕</span></th>
                                        <th title="Click to sort" onClick={() => this.sortData("New Recovered")}>New Recovered <span className={styles.arrowUpDown}>↕</span></th>
                                        <th title="Click to sort" onClick={() => this.sortData("Deaths")}>Deaths <span className={styles.arrowUpDown}>↕</span></th>
                                        <th title="Click to sort" onClick={() => this.sortData("New Deaths")}>New Deaths <span className={styles.arrowUpDown}>↕</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.filteredList.map((rec) => {
                                            return (
                                                <tr>
                                                    <td>{rec.Country}</td>
                                                    <td>{rec.TotalConfirmed}</td>
                                                    <td>{rec.NewConfirmed}</td>
                                                    <td>{rec.TotalRecovered}</td>
                                                    <td>{rec.NewRecovered}</td>
                                                    <td>{rec.TotalDeaths}</td>
                                                    <td>{rec.NewDeaths}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    : <div>
                        <p className={styles.alertPrimary}>No Country found</p>
                      </div>
                }
                
            </div>
        );
    }
}

export default CountryLists;