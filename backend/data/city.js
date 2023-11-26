const { ObjectId } = require("mongodb");

module.exports = (mongoose) => {
    const City = mongoose.model(
      'City',
      mongoose.Schema(
        {
          name: {type: String, required: true},
          population: {type: Number, required: true},
          area: {type: Number},
          country_id: {type: ObjectId},
          elevation: {type: Number}
        }   
      )
    );
  
    return City;
  };