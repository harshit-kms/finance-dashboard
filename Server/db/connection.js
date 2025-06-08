const mongoose = require('mongoose');

const db = async () => {
  try{
    mongoose.set('strictQuery', false)
    console.log("ATLAS_URI is:", process.env.port);
    await mongoose.connect(process.env.ATLAS_URI)
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
     );
  }
  catch(err){
    console.log("Error: ", err.message);
  }
}

module.exports = {db};
