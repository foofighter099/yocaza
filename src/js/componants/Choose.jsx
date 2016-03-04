var React = require('react');
var data = require('./data');
import {browserHistory} from 'react-router';

// import {Link} from 'react-router'

var pizzas = [
  {
    name: 'Cheese Pizza',
    cheese: 'mozzarella',
    toppings: [],
    price: 5
  },
  {
    name: 'The Monster',
    cheese: 'parmesan',
    toppings: ['anchovies', 'lobster', 'truffle oil'],
    price: 100
  }
];
var menu = []
var pizzaList = pizzas.map(function(pizza){
    var pizzaDescribe = (
        <div key={pizza.name}>
        <h2>{pizza.name}</h2>
        <h3>Toppings:</h3>
        <ul>
        <li>Cheese: {pizza.cheese}</li>
            {pizza.toppings.map(function(topping){return (<li key={topping}>{topping}</li>)})}
        </ul>
        </div>
        )
    menu.push(pizzaDescribe)
return (
    <option value={pizza} key={pizza.name}>{pizza.name}</option>
    )
})

var ChooseFields = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        data.order.push(this.refs.pizzalist.value)
        browserHistory.push('/Done')
        console.log(data)
    },
    
    customPizza: function(){
      browserHistory.push('/Custom');
    },
    
    render: function(){
        return (
            <div>
          
            <select ref='pizzalist' defaultValue=''>
              {pizzaList}
            </select>
            
            <br/>
            <button onClick={this.handleClick}>Select this Pizza</button>
            <br/>
            <button onClick={this.customPizza}>or Customize a Pizza</button>
              {menu}
            </div>
            
            )
    }
})


module.exports = ChooseFields