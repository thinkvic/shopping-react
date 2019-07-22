import React from 'react';
import { Avatar, IconButton, Typography, TextField, Button, Icon, Card, CardHeader, CardMedia, CardActions, CardContent } from '@material-ui/core';
import { AddShoppingCart, DeleteOutline } from '@material-ui/icons';

export default ({ onButtonClick }) => {
    <IconButton aria-label="Delete from Cart" onClick={onButtonClick}>
        <DeleteOutline />
    </IconButton>
}
