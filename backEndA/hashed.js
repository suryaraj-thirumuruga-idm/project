const bcrypt = require('bcryptjs');

const hashGenarating = async (plainpassword) => {
    try {
    
      const salt = await bcrypt.genSalt(10);
   
      const hash = await bcrypt.hash(plainpassword, salt);
      return hash;
    } catch (error) {
      console.error('Error generating hash:', error);
      throw error; 
  };}

const hashValidator = async (plainpassword, hashedpassword) => {
try {
    const validating = await bcrypt.compare(plainpassword, hashedpassword);
    return validating;
} catch (error) {
    console.log("Error Validating",error)
}
  
};
module.exports.hashGenarating = hashGenarating;
module.exports.hashValidator = hashValidator;
