const mongoose = require('mongoose');

//mongoose schema obj
const StudentSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone_number : String,
    dob: String,
    department_id: Number
});

module.exports = mongoose.model('students',StudentSchema);