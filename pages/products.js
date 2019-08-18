import React , { Component } from 'react'
import ProductList from "../components/Products/ProductList";

class Products extends Component {

    render(){
       return(
           <React.Fragment>
               <h1>Products</h1>
               <ProductList/>
           </React.Fragment>
       )
    }
}

export default Products;


