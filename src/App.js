import React from 'react';
import './App.css';
import Item from './Item'
import List from './List'
import json from './products'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "mode": "product",
      "selectedmap": {},
      "total": 0
    }
  }

  componentDidMount() {
    this.disp = json;
  }

  doAddClick(id) {
    console.log(id);
    let selectedmap = this.state.selectedmap;
    // const foundindex = selectedarr.findIndex((obj) => obj.id == e)
    if (id in selectedmap) {
      let amount = selectedmap[id] + 1;
      selectedmap = { ...selectedmap, [id]: amount };
    } else {
      selectedmap = { ...selectedmap, [id]: 1 }
    }

    this.setState(
      {
        selectedmap: selectedmap,
        total: this.state.total + 1
      },
      (prevState) => {
        console.log('this.state', this.state, this.prev);
        // return { total: prevState.total }
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
    if (this.state.mode == "cart") {
      disp = json.filter(
        (obj) => obj.id in this.state.selectedmap
      )
    } else {
      disp = json;
    }

    console.log('displayed', this.disp);

    return (
      <div className="App">
        <p onClick={() => this.viewMode('product')}>NASDAQ STORE</p>
        <p onClick={() => this.viewMode('cart')}>My Shopping Cart {this.state.total}</p>
        <List products={disp} onAddClick={(e) => this.doAddClick(e)}>  </List>
        {/* <Item product={products[0]} ></Item> */}
      </div >
    );
  }

}

export default App;
