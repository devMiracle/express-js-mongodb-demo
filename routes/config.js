module.exports = (app) => {
    require('./student')(app,"students",message);
    require('./lecturer')(app,"lecturers",message);
    require('./department')(app,"departments",message);
};

function message(type,who){
    if(type === "post") {
        return `${who} Created Successfully`;
    }
    if(type === "put") {
        return `${who} Updated Successfully`;
    }
    if(type === "delete") {
        return `${who} Deleted Successfully`;
    }
    
}