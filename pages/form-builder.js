import React , { Component } from 'react'
import Header from '../components/Header'
import SurveyCreator from '../components/Forms/SurveyCreator';


class FormBuilder extends Component {
    render(){
       return(
           <React.Fragment>
                <Header/>
                <SurveyCreator/>
            </React.Fragment>
       )
    }
}

export default FormBuilder;


/*
Todo
1 - grab json output of save survey - done
2 - test saveFormJson - done
3 - add form json to saveFormJson mutation - done
4 - add a form picker to UI?
5 - update saveFormresults to include actual form ID
 */