import React from 'react'
import './List.css'
import Item from './Item'


const List = ({ products, onButtonClick, action }) => {
    let listdom = products.map(
        (product) =>
            <div key={product.id} className="box">
                <Item onButtonClick={() => onButtonClick(product.id)} product={product}
                    action={action}>
                </Item>
            </div>
    )

    return <div className="container">{listdom}</div>
}

export default List

