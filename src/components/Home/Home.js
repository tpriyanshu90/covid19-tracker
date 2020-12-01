import React from 'react';

import styles from './Home.module.css';
import { Cards, Charts, CountryLists} from '../../components';
import { fetchData } from '../../api';

class Home extends React.Component{
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
        <div className={styles.cardContainer}>
          <Cards data = {data}/>
          <Charts data = {data}/>
        </div>
        <CountryLists/>
      </div>
    );
  }
}

export default Home;
