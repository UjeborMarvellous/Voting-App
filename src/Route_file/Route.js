import React from 'react'
import App from '../App';
import Voting from '../components/Voting'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const Routes = () => {
    return ( 
        <Router>
            <Switch>
         <Route exact path='/' component={App}/>
                <Route exact path='/vote' component={Voting}/>
    <Route  path='*' component={()=><h1>This is not found component</h1>}/>
            </Switch>
        </Router>
     );
}
 
export default Routes;

