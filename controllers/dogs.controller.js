var mongo = require('mongodb')


module.exports = {
  getAllDogs: (req, res) => {// / Get a Mongo client to work with the Mongo server
    var MongoClient = mongo.MongoClient;
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/mongoTestExpress';

    // Connect to the server
    MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the Server', err);
    } else {
      // We are connected
      console.log('Connection established to', url);

      // Get the documents collection
      var collection = db.collection('dogs');
      // console.log(collection)
      // Find all students
      collection.find({}).toArray(function (err, result) {
        if (err) {
          res.send(err);
        } else if (result.length) {

          res.render('doglist', {"doglist":result});
        } else {
          res.send('No documents found');
        }
        //Close connection
        db.close();
        })
      }
    })
  },
  addNewDogGET:(req, res) => {
    res.render('newdog', {title:"Add Doggie"})
  },
  addNewDogPOST:(req,res) => {
    var MongoClient = mongo.MongoClient;

    var url = 'mongodb://localhost:27017/mongoTestExpress';

    MongoClient.connect(url, (err, db) => {
      if (err){
        console.log(`error:${err}`)
      } else {
        console.log('Connected to Server');

        var collection = db.collection('dogs');
        var dog2 = {dog: req.body.name, breed: req.body.breed, description: req.body.description};
        console.log(collection)
        console.log(dog2)

        collection.insert(dog2, function(err, result){
          if (err){
            console.log(err)
          } else {
            res.redirect("/thelist")
            console.log(result)
          }
        })
          db.close();
        }
      })
    }
  }
