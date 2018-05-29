const mongoose = require('mongoose');

//mongoose schema obj
const DepartmentSchema = mongoose.Schema({
    name: String,
    college_id: String,
    hod_id: String,
});

module.exports = mongoose.model('departments',DepartmentSchema);