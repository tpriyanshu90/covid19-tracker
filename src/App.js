import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import styles from './App.module.css';
import { About, Error, Home, PaginatedTable} from './components';
import image from './assets/images/covid19.png';

class App extends React.Component{
  render(){
    return (
      <div className={styles.container}>
        <header className={styles.navbar}>
            <img className={styles.image} src={image} alt="COVID-19" /> 
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/paginatedTable">Paginated Table</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
        </header>
        
        <Switch>
            <Route 
                exact
                path='/'
                component={ Home }
            />
            <Route 
                exact
                path='/paginatedTable'
                component={ PaginatedTable }
            />
            <Route 
                exact
                path='/about'
                component={About}
            />
            <Route component={ Error }/>
        </Switch>

        <footer className={styles.footer}>
          <p>Developed by Priyanshu Tiwari &copy; <a href="https://tpriyanshu.bitbucket.io">tpriyanshu</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
