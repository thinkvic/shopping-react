
// npm install @material-ui/core
// npm install @material-ui/icons
import React from 'react'
import { Avatar, IconButton, Typography, TextField, Button, Icon, Card, CardHeader, CardMedia, CardActions, CardContent } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import './Item.css'

const Item = ({ product, onAddClick }) =>

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
            <IconButton aria-label="Add to Cart" onClick={onAddClick}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>

export default Item