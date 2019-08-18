import React , { Component } from 'react'
import Header from '../components/Header'
import {Container, Row, Col, DropdownButton, Dropdown, Jumbotron} from "react-bootstrap";
import ProductCreator from "../components/Products/ProductCreator";
import ProductList from "../components/Products/ProductList";

class Admin extends Component {

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
                        <Col>
                            <h3>Products and Benchmarks</h3>
                            <br/>
                            <Jumbotron>
                                <h4>Create a Product</h4>
                                <br/>
                               <ProductCreator/>
                            </Jumbotron>
                            <br/>
                            <br/>
                            <br/>
                            <ProductList/>
                        </Col>
                    </Row>
                </Container>

           </React.Fragment>
       )
    }
}

export default Admin;


/*

Product Creator:
1: Add table for product (name and description)
2: Add component for createproduct
3: Add add fields for create product in component: Product name and description
4: On save create object and push to createProduct mutation

List of products
1: create component for List of Products
2: use queryrenderer to loop through products
3: display products as a list

BM and ET
1: Create a component for BM and ET
2: Pass product object to the component
3: Component has prdouct name, description, BM and ET fields and a save button
4: on save create update BM/ET Values: Todo: Add history in the future
5: Update the components

 */