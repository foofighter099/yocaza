var React = require('react');
var AccountFields = require('./Accountfields.jsx');
var ChooseFields = require('./Choose.jsx')

var fieldValues = {
 name : null,
 email : null,
 phone : null,
 homeaddress : null,
 pizza : [],
 toppings: []
}

var Registration = React.createClass({
 getInitialState: function() {
 return {
 step : 1
 }
 },
 
 saveValues: function(fields){
   fieldValues = Object.assign({}, fieldValues, fields)
 },
 
 nextStep: function(){
   this.setState({
     step: this.state.step + 1
   })
 },
 
 previousStep: function(){
   this.setState({
     step: this.state.step - 1
   })
 },
 
 render: function() {
 switch(this.state.step) {
 case 1:
 return <AccountFields 
      fieldValues={fieldValues} 
      nextStep={this.nextStep} 
      saveValues={this.saveValues}/>
 case 2:
 return <ChooseFields 
     fieldValues={fieldValues}
     nextStep={this.nextStep}
     previousStep={this.previousStep}
     saveValues={this.saveValues}/>
 case 3:
 return <Confirmation 
     fieldValues={fieldValues}
     previousStep={this.previousStep}
     saveValues={this.saveValues}
     submitRegistration={this.submitRegistration}/>
 case 4:
 return <Success fieldValues={fieldValues}/>
 }
 }
})

module.exports = Registration;