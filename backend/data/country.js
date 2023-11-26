module.exports = (mongoose) => {
    const Country = mongoose.model(
      'Country',
      mongoose.Schema(
        {
          name: {type: String, required: true},
          population: {type: Number, required: true},
          area: {type: Number, required: true},
          gdppc: {type: Number},
          gini: {type: Number},
          hdi: {type: Number}
        }   
      )
    );
  
    return Country;
  };
  // const Country = mongoose.model('Country', Schema)