const DepartmentModel = require("../models/Department");
const RequestHandler = require('req-handler');
const deparmentSchema = new RequestHandler();

deparmentSchema.setSchema([
    {name:"name",type:"string",required:true},
    {name:"college_id",type:"string",required:true},
    {name:"hod_id",type:"string",required:true}
]);

module.exports= (app,path,message) => {
    app.get(`/${path}`, (req, res)=>{
        DepartmentModel.find((err, details) => {
            if (err) {
                res.send("Error Getting Departments \n"+err);
            }else{
                res.send({
                    data: details,
                })
            }
          })
    });

    app.post(`/${path}`, (req, res)=>{
        let body = req.body;
        const newDepartment = new DepartmentModel(body);
        //Using ``REQ-HANDLER`` TO HANDLE ALL THE USERS POST REQUEST
        const validator = deparmentSchema.validate(body);
        if(validator.error) return res.send(validator);

        
        newDepartment.save((err, details) => {
            if (err) {
              res.send("Error Creating New Department \n"+ err)  
            }else{
                res.send({
                    message: message("post","Department"),
                    data: details
                })
            }
        })
    });

    app.put(`/${path}/:id`, (req, res)=>{
        let id = req.params.id;
        let body = req.body;

        //Using ``REQ-HANDLER`` TO HANDLE ALL THE USERS PUT REQUEST
        const validator = lecturerSchema.validate(body);
        if(validator.error) return res.send(validator);

        DepartmentModel.where({ _id: id }).update(body).exec((err, details) => {
            if(err){
                res.send(`Error Updating Student \n${err}`);
            }else{
                res.send({
                    message:message("put","Department"),
                    data: details
                });
            }
        });
    })

    app.delete(`/${path}/:id`, (req, res)=>{
        let id = req.params.id;

        DepartmentModel.where({ _id: id }).remove().exec((err, detail) => {
            if(err){
                res.send(`Error Deleting Department \n${err}`);
            }else{
                res.send({
                    // item,
                    message: message("delete","Department"),
                    data: detail
                });
            }
        });
    })

}