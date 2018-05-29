const LecturerModel = require("../models/Lecturer");
const RequestHandler = require('req-handler');
const lecturerSchema = new RequestHandler();

lecturerSchema.setSchema([
    {name:"first_name",type:"string",required:true},
    {name:"last_name",type:"string",required:true},
    {name:"email",type:"string",required:true},
    {name:"phone_number",type:"string",required:true},
    {name:"dob",type:"string",required:true},
    {name:"department_id",type:"number",required:true}
]);

module.exports= (app,path,message) => {
    app.get(`/${path}`, (req, res)=>{
        LecturerModel.find((err, lecturer) => {
            if (err) {
                res.send("Error Getting Lecturer \n"+err);
            }else{
                res.send({
                    data: lecturer,
                })
            }
          })
    });

    app.post(`/${path}`, (req, res)=>{
        let lecturerObject = req.body;
        const newLecturer = new LecturerModel(lecturerObject);
        //Using ``REQ-HANDLER`` TO HANDLE ALL THE USERS POST REQUEST
        const validator = lecturerSchema.validate(lecturerObject);
        if(validator.error) return res.send(validator);

        
        newLecturer.save((err, lecturer) => {
            if (err) {
              res.send("Error Creating New Lecturer \n"+ err)  
            }else{
                res.send({
                    message: message("post","Lecturer"),
                    data: lecturer
                })
            }
        })
    });

    app.put(`/${path}/:id`, (req, res)=>{
        let id = req.params.id;
        let lecturerObject = req.body;

        //Using ``REQ-HANDLER`` TO HANDLE ALL THE USERS PUT REQUEST
        const validator = lecturerSchema.validate(lecturerObject);
        if(validator.error) return res.send(validator);

        LecturerModel.where({ _id: id }).update(lecturerObject).exec((err, lecturer) => {
            if(err){
                res.send(`Error Updating Student \n${err}`);
            }else{
                res.send({
                    message:message("put","Lecturer"),
                    data: lecturer
                });
            }
        });
    })

    app.delete(`/${path}/:id`, (req, res)=>{
        let id = req.params.id;

        LecturerModel.where({ _id: id }).remove().exec((err, detail) => {
            if(err){
                res.send(`Error Deleting Lecturer \n${err}`);
            }else{
                res.send({
                    // item,
                    message: message("delete","Lecturer"),
                    data: detail
                });
            }
        });
    })

}