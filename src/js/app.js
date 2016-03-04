var React = require('react');
var ReactDOM = require('react-dom');
var data = require('./componants/data');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var OrderForm = require('./componants/OrderForm.jsx');
var ChooseFields = require('./componants/Choose.jsx');
var CustomToppings = require('./componants/Custom.jsx');



// A simple navigation component
var Navigation = React.createClass({
  render: function() {
    return (
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/Order">Order</Link>
          </li>
          <li>
            <Link to="/Choose">Choose</Link>
          </li>
          <li>
            <Link to="/Custom">Custom</Link>
          </li>
        </ul>
      </nav>
    );
  }
});

// The main application layout
// this.props.children will be set by React Router depending on the current route
var App = React.createClass({

  
  render: function() {
    return (
      <main>
        <Navigation/>
        {this.props.children}
      </main>
    );
  }
});


var Order = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Order</h1>
        <OrderForm />
      </div>
    );
  }
});




var Choose = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Choose your Pizza</h1>
        <ChooseFields />
      </div>
    );
  }
});


var Custom = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Custom Order</h1>
        <CustomToppings />
      </div>
    );
  }
});

var Done = React.createClass({
  render: function() {
    console.log(data)
    return (
      <div>
        <h1>Your Order:</h1>
        {data.order}
        <h2>Client Info:</h2>
        {data.name}<br/>
        {data.phone}<br/>
        {data.email}<br/>
        {data.address}<br/>
      </div>
    );
  }
});

// not found "page"
var NotFound = React.createClass({
  render: function() {
    return (
      <div>Not Found!</div>
    );
  }
});

/*
The routes. This section says:
  - If the route starts with /, load the App component
  - If the route IS /, load the Home component INSIDE App as this.props.children
  - If the route is /about, load the About component INSIDE App as this.props.children
  - If the route is /team, load the Team component INSIDE App as this.props.children
  - If the route is /about, load the About component INSIDE App as this.props.children
  - If the route is anything else, load the NotFound component INSIDE App as this.props.children

The whole process lets us create **complex, nested user interfaces** with minimal effort,
by simply nesting `Route` components.
*/


var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Order}/>
      <Route path="Order" component={Order}/>
      <Route path="Choose" component={Choose}/>
      <Route path="Custom" component={Custom}/>
      <Route path="Done" component={Done}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// If this line of code is not here, nothing gets displayed!
ReactDOM.render(routes, document.querySelector('#app'));
