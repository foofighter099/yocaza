var House = Parse.Object.extend('House');
Parse.Cloud.define('hello', function(req, res){
  res.success('hello')
})

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
        var user = new Parse.User();
        user.set({
          username: req.params.agentContact.email,
          email: req.params.agentContact.email,
          name: req.params.agentContact.name,
          password: random,
          phone: req.params.agentContact.phone,
          role: req.params.agentContact.role,
          heading: req.params.agentContact.heading,
          other: req.params.agentContact.other
        })
        user.signUp().then(
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
