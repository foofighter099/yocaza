var React = require('react');
var ReactDOM = require('react-dom');
require('../css/app.css');
var Modal = require('react-modal');
var Parse = require('parse');
Parse.initialize("lQnkbNmyR7nIjCi8T2afRofbjAu0XoiwawDoS0oj", "WDCLF1vNBUpVZmL69ObLXLjZfUeYvxdCA0luVDR7");
window.Parse=Parse;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var Geosuggest = require('react-geosuggest');

var Dropzone = require('react-dropzone');
var EventEmitter = require('events');

var hub = new EventEmitter()

var DropImages = React.createClass({
    getInitialState: function () {
        return {
          files: []
        };
    },
    
    removeImage: function(e, x){
      // x.dataTransfer.setData('image', x.currentTarget);
        // if (e%2 == 0){
        // if (x.nativeEvent.offsetX < -14 || x.nativeEvent.offsetX > 340){
        //   this.state.files.splice(e,1);
        //   this.forceUpdate();
        // }
        // } else {
        //   if (x.nativeEvent.offsetX < -185 || x.nativeEvent.offsetX > 175){
        //         this.state.files.splice(e,1);
        //         this.forceUpdate();
        // }
        // }
        // x.target.style.border="none"
    },
    deleteZone: function(e,x){
      // target.style.border="4px solid red"
    console.log(x.target)
    },
    position: function(e,x){
        if (e%2 == 0){
         if (x.nativeEvent.offsetX < -14 || x.nativeEvent.offsetX > 340){
           x.target.style.border="4px solid red"
         } else {x.target.style.border="none"}
        } else {
          if (x.nativeEvent.offsetX < -185 || x.nativeEvent.offsetX > 175){
           x.target.style.border="4px solid red"
         } else {x.target.style.border="none"}
        }
    },
    dragStart: function(e, x){
       x.dataTransfer.setData("text", e);
    },
    dragEnd: function(e, x) {
     var originIndex = x.dataTransfer.getData("text")
     var targetIndex = e
    Array.prototype.move = function (old_index, new_index) {
          if (new_index >= this.length) {
              var k = new_index - this.length;
              while ((k--) + 1) {
                  this.push(undefined);
              }
          }
          this.splice(new_index, 0, this.splice(old_index, 1)[0]);
          return this; // for testing purposes
      };
      this.state.files.move(originIndex,targetIndex)
      this.forceUpdate();


  },
  
    onDrop: function (files) {
      if (this.state.files.length > 0){
        files.map((file) => this.state.files.push(file))
        this.forceUpdate()
      } else {
      this.setState({
        files: files
      });
      }
    },
    
    onOpenClick: function () {
      this.refs.dropzone.open();
    },
    
    getValues: function() {
    return this.state.files
    },

    render: function () {
      var containerClassname = '';
      if (this.state.files.length <= 2) {
        var containerClassname = 'few-images';
      }
      
        return (
            <div className={containerClassname}>
                <Dropzone className={this.props.classname} ref="dropzone" onDrop={this.onDrop}>
                    {this.state.files.map((file,i) => (
                      <div 
                      key={i} 
                      data-tag={i}
                      onTouchEnd={this.dragEnd.bind(this, i)}
                      onTouchMove={this.dragStart.bind(this, i)}
                      onTouchStart={this.dragStart.bind(this, i)} 
                      draggable="true"
                      onDrop={this.dragEnd.bind(this, i)}
                      onDragStart={this.dragStart.bind(this, i)}
                      onMouseOver={this.deleteZone.bind(this, i)}
                      // onDragEnd={this.removeImage.bind(this, i)}
                      // onDrag={this.position.bind(this, i)}
                      className='touchControl'
                      >
                        <button onClick="removeImage"className="deleteButton">delete</button>
                        <img src={file.preview}/>

                      </div>
                    ) )}
                </Dropzone>
            </div>
        );
    }
});

var Wording = React.createClass({
  suggestSelected: function(x){
    this.setState({address:x})
  },
  getValues: function() {
    var fields = ["price","bed","bath","description"]
    var that = this;
    var values = {}
    fields.map(
        function(field) {
        values[field] = that.refs[field].value;
        });
    values.homeAddress = this.state.address    
    return values
  },
  render: function(){
    var label = function(suggest){
      var format = suggest.description.split(',')[0] + "," + suggest.description.split(',')[1]
    return (format)
    };
    return (
      <form className='moreinfo'>
        <div><Geosuggest onSuggestSelect={this.suggestSelected} ref='address' getSuggestLabel={label} placeholder="ie. 148 Kohler Street" /></div>
        <div className="SameLine">
          <div><input type='text' className="price" ref="price" defaultValue="$285,000" maxLength="20"/></div>
          <label className="labelBathAndBed">Bedrooms:<input type='text' ref="bed" defaultValue="3" className="beds" maxLength="1"/></label>
          <label className="labelBathAndBed">Bathrooms:<input type='text' ref="bath" defaultValue="2" className="baths" maxLength="1"/></label>
        </div>
        <div><textarea className="description" ref="description" defaultValue="Facing green space and gardens this end unit is a one of a kind executive town home with its modern and luxury finishings. The beautiful home has colonial trim through out and tile flooring in foyer. 

The fully finished basement is tile with a full bathroom and laundry room. Attractive kitchen with good cupboard & counter space and 3 appliances. All three bathrooms, and garage have been  updated. Hardwood floors on main level as well as 2nd level. Master bedroom has cheater door to main bath.

Nicely sized secondary bedrooms. Fully finished lower level with family room & full bath! Private yard contains privately landscaped gardens & is fully fenced. Spacious, renovated, open concept end unit condo is located directly in front of a Park and community gardens. 20 minutes to downtown and in proximity of schools."></textarea></div>
      </form>
      )
  }
})

var ContactCard = React.createClass({
  getValues: function() {
    var fields = ["heading","name","role","email","phone","other"]
    var that = this;
    var values = {}
    fields.map(
        function(field) {
        values[field] = that.refs[field].value;
        });
    return values
  },
  render: function(){
    return (
      <form className="contactcard">
        <div><input type='text' className="heading" ref="heading" defaultValue="For more information, please contact:"/></div>
        <div><input type='text' className="name" ref="name" defaultValue="Daniel Joseph"/></div>
        <div><input type='text' className="other" ref="role" defaultValue="Sales Representative"/></div>
        <div><input type='email' className="email" ref="email" defaultValue="danieljames@email.com"/></div>
        <div><input type='text' className="phone" ref="phone" defaultValue="(514) 555-2345"/></div>
        <div><input type='text' className="other" ref="other" defaultValue="148kohlerst.com"/></div>
      </form>
      )
  }
})


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
  componentDidMount(){
    hub.addListener("save", this.openModal);
  },
  componentWillUnmount(){
    hub.removeListener("save", this.openModal);
  },
    getInitialState: function() {
    return { 
      modalIsOpen: false,
      // Name: "Enter your name on the Feature Sheet",
      // Email: "Enter your email on the Feature Sheet",
      // Mainimage: "Enter your image on the Feature Sheet"
    };
  },

  openModal: function(x) {
    console.log(x);
    if (!x.agentContactInfo.email){
      ReactDOM.findDOMNode(this.refs.featuresheetpage.refs.cc.refs.email).focus()
    } else if (!x.mainImage[0]){
      alert("Enter your images before proceeding.")
    }
    else {
    this.setState({
      houseData: x,
      modalIsOpen: true,
      Email: x.agentContactInfo.email,
      Mainimage: x.mainImage[0].preview
    });
    }
  },
  closeModal: function() {
    this.setState({
      modalIsOpen: false
    });
  },
  sendPdf: function() {
    Parse.Cloud.run('savePdf', {agentContact: this.state.houseData.agentContactInfo, homeDetails: this.state.houseData.homeDetails}).then(function(res){
      console.log(res);
    })
  },
  render: function() {
    
    if (!this.state.Mainimage === false){
      var backgroundFromImage = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('"+ this.state.Mainimage +"')";
    } else {
      var backgroundFromImage = "white";
    }
    
    const customStyles = {
      content : {
        color                 : 'white',
        fontSize              : '1em',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundSize        : "cover",
        background            : backgroundFromImage,
        textAlign             : "center",
        padding               : "50px"
      }
};
    return (
      <main>
      <ToolBar />
      <div id="header">
        <h1 id="logo">yocaza</h1>
        <h2 id='tagline'>feature sheet generator</h2>
      </div>
      
      <page id="A4">
       <FeatureSheet ref="featuresheetpage"/>
      </page>
          <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles} >
              <br />
              <h2>Your PDF will be sent to:</h2>
              <br />
              <div>{this.state.Email}</div>
              <br />
              <button onClick={this.sendPdf}>Send PDF</button>
              <br />
              <br />
          </Modal>
      </main>
    );
  }
});

var FeatureSheet = React.createClass({
  componentDidMount(){
    hub.addListener("data-request", this.onSave);
  },
  componentWillUnmount(){
    hub.removeListener("data-request", this.onSave);
  },
  onSave: function() {
    var featureSheet = {
      agentContactInfo: this.refs.cc.getValues(),
      homeDetails: this.refs.hd.getValues(),
      mainImage: this.refs.mi.getValues(),
      otherImages: this.refs.oi.getValues()
    };
    hub.emit("save", featureSheet);
  },
  
  render: function() {
    
    return (
      <div>
        <DropImages classname="mainImg" maxFiles="1" ref='mi'/>
        <div className="contentBody">
          <DropImages classname="imageContainer" ref='oi' />
            <div className="details">
              <Wording ref='hd' />
              <ContactCard ref="cc" />
            </div>
       </div>
      </div>
    );
  }
});

var ToolBar = React.createClass({
  onTheEvent: function(e){
        e.preventDefault();
      
        hub.emit("data-request");
  },
  render: function(){
    return (
      <div id="toolbar">
        <button className="submitButton" onClick={this.onTheEvent}>Send PDF</button>
      </div>
    );
  }
})

////MODAL/////




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
      <IndexRoute component={FeatureSheet}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// If this line of code is not here, nothing gets displayed!
ReactDOM.render(routes, document.querySelector('#app'));
