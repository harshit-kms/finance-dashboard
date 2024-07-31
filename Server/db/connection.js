const mongoose = require('mongoose');

const db = async () => {
  try{
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.ATLAS_URI)
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
     );
  }
  catch{
    console.log("Error");
  }
}

module.exports = {db};
