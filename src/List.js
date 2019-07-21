import React from 'react'
import './List.css'
import Item from './Item'

const List = ({ products, onAddClick }) => {
    let listdom = products.map(
        (product) =>  
        <div key={product.id} className="box"> 
            <Item onAddClick={()=>onAddClick(product.id)}  product={product}>
            </Item>
        </div>       
    )

    return <div className="container">{listdom}</div>
}

export default List

