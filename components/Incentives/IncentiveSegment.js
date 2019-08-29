import React ,{ Component } from 'react'
import {graphql, QueryRenderer, fetchQuery} from "react-relay";

class IncentiveCalculator extends Component {

    constructor(props) {
        super(props);
    }


    render(){
       return 'Hello Component'
    }

}

export default IncentiveCalculator;

/*

Incentives Calculator
1: Get the application by id - fetch application
2: extract the production data from the app
3: get the benchmark / et for each production item - fetch benchmarks
4: Create a view from the carbon tax table
4: get the carbon tax paid by facility that year
5: do the calculation

*/