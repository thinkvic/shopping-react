import React from 'react';
import './App.css';
import Item from './Item'
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
    this.disp = json;
  }

  doAddClick(id) {
    console.log(id);
    let selectedmap = this.state.selectedmap;
    console.log('smap', selectedmap);
    // const foundindex = selectedarr.findIndex((obj) => obj.id == e)
    if (id in selectedmap) {
      let amount = selectedmap[id] + 1;
      selectedmap = { ...selectedmap, [id]: amount };
    } else {
      selectedmap = { ...selectedmap, [id]: 1 }
    }

    this.setState(
      (prevState) => {
        return { total: prevState.total + 1, selectedmap: selectedmap }
      }
    )
  }



  doDeleteClick(id) {
    console.log(id);
    let selectedmap = this.state.selectedmap;
    console.log('current selected', selectedmap);
    if (id in selectedmap) {
      let amount = selectedmap[id] - 1;
      console.log('amount', amount);

      if (amount) {
        selectedmap = { ...selectedmap, [id]: amount };
      } else {
        console.log('id', id);
        delete selectedmap[id]
      }
    } else {

    }

    this.setState(
      // {
      //   selectedmap: selectedmap,
      //   // total: this.state.total - 1
      // },
      (prevState) => {
        return { total: prevState.total - 1, selectedmap: selectedmap }
      }
    )
  }

  viewMode(m) {
    this.setState(
      { mode: m }
    )
  }


  render() {
    // console.log('json', json);
    let disp
    let doClick
    let add=false
    let remove=false
    let currentmode="product"
    let description
    if (this.state.mode == "cart") {
      let totalprice=0;
      console.log("selected in render func", this.state.selectedmap)
      disp = json.reduce(
        (filtered, obj) => {
          if (obj.id in this.state.selectedmap) {
            let amount = this.state.selectedmap[obj.id];
            totalprice=totalprice+obj.price*amount;
            return [...filtered, { ...obj, amount}]
          } else {
            return filtered
          }
        }, []
      )
      doClick = this.doDeleteClick
      remove = true;
      currentmode = "cart"
      description = `Your total is $${totalprice}`
    } else {
      disp = json;
      doClick = this.doAddClick;
      add = true;
      currentmode = "product"
      description = `Welcome!`
    }

    let action = { add, remove };

    console.log('displayed', this.disp);
    const active = { backgroundColor: '#888888' }

    return (
      <div className="App">
        <AppBar position="fixed" style={{ backgroundColor: '#666666' }}>
          <Toolbar>
            <Typography variant="h5" color="inherit">
              NASDAQ &nbsp; &nbsp;{description}
            </Typography>

            <div className="right">
              <MenuItem style={currentmode == 'product' ? active : {}} onClick={() => this.viewMode('product')}>
                <IconButton aria-label="Store home" color="inherit">
                  <Home />
                </IconButton>
                <Hidden mdDown>
                  <span>Store Home</span>
                </Hidden>
              </MenuItem>
              &nbsp; &nbsp;
              <MenuItem style={currentmode == 'cart' ? active : {}} onClick={() => this.viewMode('cart')}>
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
          <List products={disp} onButtonClick={doClick} action={action}>  </List>
        </div>

        {/* <Item product={products[0]} ></Item> */}
      </div >
    );
  }

}

export default App;
