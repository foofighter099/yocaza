var React = require('react');
import {browserHistory} from 'react-router';

var toppings = [
  {
    name: 'pepperoni',
    displayName: 'Pepperoni',
    price: 1
  },
  {
    name: 'anchovies',
    displayName: 'Anchovies',
    price: 10
  },
  {
    name: 'lobster',
    displayName: 'Lobstah',
    price: 25
  },
  {
    name: 'truffle oil',
    displayName: 'Mmmm... truffle oillll',
    price: 100
  }
];

var CustomToppings = React.createClass({
    handleClick: function(e){
        
        browserHistory.push('/Done')

    },
    render: function(){
        return (
            <div>   
                <label>{toppings[0].displayName}</label>
                <input type='checkbox' ref='toppings0' value={toppings[0]}/>
                <br/>
                <label>{toppings[1].displayName}</label>
                <input type='checkbox' ref='toppings1' value={toppings[1]}/>
                <br/>
                <label>{toppings[2].displayName}</label>
                <input type='checkbox' ref='toppings2' value={toppings[2]}/>
                <br/>
                <label>{toppings[3].displayName}</label>
                <input type='checkbox' ref='toppings3' value={toppings[3]}/>
                <br/>
                <button onClick={this.handleClick}>Done</button>
            </div>
            )
    }
})

module.exports = CustomToppings;