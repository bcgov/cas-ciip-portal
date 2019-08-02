import React , { Component } from 'react'
import Header from '../components/Header'
import FormCreator from '../components/Forms/FormCreator';
import FormPicker from "../components/Forms/FormPicker";
import {Container , Row, Col, DropdownButton, Dropdown} from "react-bootstrap";

class FormBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {formId: '', formJson: ''}
        };

    }

    formIdHandler = (formId, formJson) => {
        this.setState({formData: { formId, formJson }});
        console.log('form-builder.js > formIdHandler state', this.state)
    };

    render(){
       return(
           <React.Fragment>
                <Header/>
                <Container>
                    <Row>
                        <Col style={{textAlign:"right"}} >
                            <FormPicker handleFormId={this.formIdHandler}/>
                        </Col>
                    </Row>
                </Container>
               <FormCreator formData={this.state.formData}  />
           </React.Fragment>
       )
    }
}

export default FormBuilder;


/*

Form Creator
1 - grab json output of save survey - done
2 - test saveFormJson - done
3 - add form json to saveFormJson mutation - done
4 - add a form picker to UI?
5 - update saveFormresults to include actual form ID

Form Editor:
1 - Reuse form selector component X
2 - get the form json
3 - load form json into the surveycreator
4 - add a flag for save
5 - versioned saving

 */