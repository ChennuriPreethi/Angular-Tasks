const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Task1', {useNewUrlParser: true});

mongoose.connect('mongodb+srv://todoapp:todo123@cluster0.zlk0r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true});

var conn =mongoose.Collection;
 
var adminSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  _UserID:{
    // type: mongoose.Types.ObjectId,
    type: String,
    required:true
  },
  completed: {
    type: Boolean
    // default: false
  }
});
 
var adminModel = mongoose.model('Admins', adminSchema);
module.exports=adminModel;