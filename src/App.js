import React from 'react';
import './App.css';
import List from './List'
import json from './products'
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Badge, Hidden } from '@material-ui/core';
import { ShoppingCart, Home } from '@material-ui/icons';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "mode": "product",
      "selectedmap": {},
      "total": 0
    }
    this.doAddClick = this.doAddClick.bind(this);
    this.doDeleteClick = this.doDeleteClick.bind(this);

  }

  componentDidMount() {
  }

  doAddClick(id) {
    console.log(id);
    let selectedmap = this.state.selectedmap;
    console.log('smap', selectedmap);
    // const foundindex = selectedarr.findIndex((obj) => obj.id == e)
    let newmap={};
    if (id in selectedmap) {
      let amount = selectedmap[id] + 1;
      newmap = { ...selectedmap, [id]: amount };
    } else {
      newmap = { ...selectedmap, [id]: 1 }
    }

    this.setState(
      (state, props) => {
        return { total: state.total + 1, selectedmap: newmap }
      }
    )
  }



  doDeleteClick(id) {
    console.log(id);
    let selectedmap = this.state.selectedmap;
    console.log('current selected', selectedmap);
    let newmap={};

    if (id in selectedmap) {
      let amount = selectedmap[id] - 1;
      console.log('amount', amount);
      if (amount) {
        newmap = { ...selectedmap, [id]: amount };
      } else {
        console.log('id', id);
        const { [id]: deleted, ...re } = selectedmap;
        newmap = re;
        // delete selectedmap[id]
      }
    } 

    this.setState(
      // {
      //   selectedmap: selectedmap,
      //   // total: this.state.total - 1
      // },
      (state, props) => {
        return { total: state.total - 1, selectedmap:newmap}
      }
    )
  }

  viewMode(m) {
    this.setState({ mode: m });
  }


  render() {
    // console.log('json', json);
    let disp
    let doClick
    let description
    if (this.state.mode === "cart") {
      let totalprice = 0;
      console.log("selected in render func", this.state.selectedmap)
      // You can have selecedmap and totalprice as states (spaces for time efficiency)
      // no need to calc during render, but wasting spaces.
      disp = json.reduce(
        (filtered, obj) => {
          if (obj.id in this.state.selectedmap) {
            let amount = this.state.selectedmap[obj.id];
            // totalamount=totalamount+amount
            totalprice = totalprice + obj.price * amount;
            return [...filtered, { ...obj, amount }]
          } else {
            return filtered
          }
        }, []
      )
      doClick = this.doDeleteClick
      description = `Your total is $${totalprice}`;

    } else {
      disp = json;
      doClick = this.doAddClick;
      description = `Welcome!`;
    }

    // let action = { add, remove };
    console.log('displayed', disp);
    const active = { backgroundColor: '#888888' }

    return (
      <div className="App">
        <AppBar position="fixed" style={{ backgroundColor: '#666666' }}>
          <Toolbar>
            <Typography variant="h5" color="inherit">
              STORE &nbsp; &nbsp;{description}
            </Typography>

            <div className="right">
              <MenuItem style={this.state.mode === 'product' ? active : {}} onClick={() => this.viewMode('product')}>
                <IconButton aria-label="Store home" color="inherit">
                  <Home />
                </IconButton>
                <Hidden mdDown>
                  <span>Store Home</span>
                </Hidden>
              </MenuItem>
              &nbsp; &nbsp;
              <MenuItem style={this.state.mode === 'cart' ? active : {}} onClick={() => this.viewMode('cart')}>
                <IconButton aria-label="Shopping cart with total" color="inherit">
                  <Badge badgeContent={this.state.total} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <Hidden mdDown>
                  <span >My Carts</span>
                </Hidden>

              </MenuItem>

            </div>


          </Toolbar>
        </AppBar>

        <div className="content">
          <List items={disp} onButtonClick={doClick}></List>
        </div>

        {/* <Item product={products[0]} ></Item> */}
      </div >
    );
  }

}

export default App;
