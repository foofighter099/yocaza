var React = require('react');
var ReactDOM = require("react-dom");
var data = require('./data');
import {browserHistory} from 'react-router'

var OrderForm = React.createClass({
    
handleSubmit: function(e){
    e.preventDefault();
    data.name = this.refs.name.value;
    data.email = this.refs.email.value;
    data.phone = this.refs.phone.value;
    data.address = this.refs.address.value;
     console.log(data)
    browserHistory.push('/Choose')
            },

render: function(){
        return (
            <div>
            <form ref="myform">
                <label>Name</label>
                <input type='text' ref='name'/>
                <br/>
                <label>Email</label>
                <input type='text' ref='email'/>
                <br/>
                <label>Phone</label>
                <input type='text' ref='phone'/>
                <br/>
                <label>Home Address</label>
                <input type='text' ref='address'/>
                <br/>
                <button onClick={this.handleSubmit}>Save and Continue</button>
            </form>
            </div>
            )
    }
});

module.exports = OrderForm