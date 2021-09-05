const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    userId: {
      type: String
    },
    password: {
      type: String
    }
  })

  
module.exports = mongoose.model('admin_users', adminSchema)