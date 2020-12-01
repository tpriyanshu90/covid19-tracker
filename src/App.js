import React from 'react';

import styles from './App.module.css';
import { Cards, Charts, CountryLists } from './components';
import { fetchData } from './api';

import image from './assets/images/covid19.png';

class App extends React.Component{
  state = {
    data: {}
  }
  async componentDidMount(){
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }
  render(){
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <header className={styles.navbar}>
        <img className={styles.image} src={image} alt="COVID-19" />
          <ul>
            <li><a class="active" href="/">Home</a></li>
            <li><a href="/paginatedTable">Paginated Table</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </header>
        
        <div className={styles.cardContainer}>
          <Cards data = {data}/>
          <Charts data = {data}/>
        </div>
        <CountryLists/>
        <footer className={styles.footer}>
          <p>Designed by Priyanshu Tiwari @tpriyanshu</p>
        </footer>
      </div>
    );
  }
}

export default App;
