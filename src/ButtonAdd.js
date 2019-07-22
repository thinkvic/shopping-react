import React from 'react';
import { Avatar, IconButton, Typography, TextField, Button, Icon, Card, CardHeader, CardMedia, CardActions, CardContent } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

export default ({ onAddClick }) => {
    <IconButton aria-label="Add to Cart" onClick={onAddClick}>
        <AddShoppingCart />
    </IconButton>
}

