
// npm install @material-ui/core
// npm install @material-ui/icons
import React from 'react'
import { Avatar, IconButton, Typography, TextField, Button, Icon, Card, CardHeader, CardMedia, CardActions, CardContent } from '@material-ui/core';
import { AddShoppingCart, DeleteOutline } from '@material-ui/icons';
import './Item.css'

const Item = ({ product, onButtonClick, action }) => {

    let adddom = action.add ? <IconButton aria-label="Add to Cart" onClick={onButtonClick}>
        <AddShoppingCart /> </IconButton> : null;
    let removedom = action.remove ? <div> <IconButton aria-label="Remove from Cart" onClick={onButtonClick}>
        <DeleteOutline /></IconButton> &nbsp; &nbsp; &nbsp; <span>Amount: {product.amount} </span> </div> : null;

    return (
        <Card >
            <CardHeader
                avatar={<Avatar aria-label="Recipe" className='avatar'>{product.name[0]}</Avatar>}
                title={product.name}
                subheader="" />
            <CardMedia className='media'
                image={product.image}
                title={product.name} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                &nbsp;&nbsp;
                Price: ${product.price}
                &nbsp;&nbsp;
                {adddom}
                {removedom}
            </CardActions>
        </Card>
    )

}

export default Item