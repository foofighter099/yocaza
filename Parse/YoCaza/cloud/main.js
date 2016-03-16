var House = Parse.Object.extend('House');
Parse.Cloud.define('hello', function(req, res){
  res.success('hello')
})

Parse.Cloud.define('savePdf', function(req, res){
  var newHouse = new House()
  newHouse.set({
    price: req.params.homeDetails.price,
    bathrooms: req.params.homeDetails.bath,
    rooms: req.params.homeDetails.bed,
    description: req.params.homeDetails.description,
    address: req.params.homeDetails.homeAddress.label,
    location: new Parse.GeoPoint({
      latitude: req.params.homeDetails.homeAddress.location.lat,
      longitude: req.params.homeDetails.homeAddress.location.lng
    }),
    mainImage: req.params.mainImage,
    otherImages: req.params.otherImages
  });

  if(req.user){
    newHouse.set('user', req.user).save().then(
      function(newHouse){
        res.success(newHouse);
      },
      function(err) {
        console.error(err);
        res.error(err);
      }
    )
  }
  else{
    var query = new Parse.Query('User')
    query.equalTo('username', req.params.agentContact.email)
    query.find().then(function(users){
      if(users.length===0){
        var random = ('' + Math.random()).substring(2);
        Parse.User.signUp(req.params.agentContact.email, random).then(
          function(user){
            newHouse.set('user', user).save().then(
              function(newHouse){
                res.success(newHouse);
              },
              function(err) {
                console.error(err);
                res.error(err);
              }
            )
          },
          function(err) {
            console.error(err);
            res.error(err);
          }
        );
      }else{
        newHouse.set('user', users[0]).save().then(
          function(newHouse){
            res.success(newHouse)
          },
          function(err) {
            console.error(err);
            res.error(err);
          }
        )
      }
    })
  }
})
var mandrill = require("mandrill");
mandrill.initialize("XeknPzu2NOlo4Tmt_C5_HA");

Parse.Cloud.define("emailTest", function(req, res) {
  mandrill.sendEmail({
    message: {
      text: "Attached you will find your feature sheet. Thank you for using YoCaza!",
      subject: "Your YoCaza feature sheet!",
      from_email: "donotreply@yocaza.com",
      from_name: "YoCaza",
      to: [
        {
          email: "andrewtognarini@gmail.com",
          name: "Andrew"
        }
      ]
    },
    async: true
  }, {
    success: function(httpResponse) { res.success("Email sent!"); },
    error: function(httpResponse) { res.error("Uh oh, something went wrong"); }
  });
}
)
  //find out how to test the email aspect
  //in chrome console --> Parse.run
  //powershell = Parse develop YoCaza
