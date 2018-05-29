const StudentModel = require("../models/Student");
const RequestHandler = require('req-handler');
const studentSchema = new RequestHandler();

studentSchema.setSchema([
    {name:"first_name",type:"string",required:true},
    {name:"last_name",type:"string",required:true},
    {name:"email",type:"string",required:true},
    {name:"phone_number",type:"string",required:true},
    {name:"dob",type:"string",required:true},
    {name:"department_id",type:"number",required:true}
]);

module.exports= (app,path,message) =>{
    app.get(`/${path}`, (req, res)=>{
        StudentModel.find((err, students) => {
            if (err) {
                res.send("Error Getting Students \n"+err)  
            }else{
                res.send({
                    data: students,
                })
            }
          })
    });

    app.post(`/${path}`, (req, res)=>{
        let studentObject = req.body;
        const newStudent = new StudentModel(studentObject);
        //Using ``REQ-HANDLER`` TO HANDLE ALL THE USERS POST REQUEST
        const validator = studentSchema.validate(studentObject);
        if(validator.error) return res.send(validator);

        
        newStudent.save((err, student) => {
            if (err) {
              res.send("Error Creating New Student \n"+ err)  
            }else{
                res.send({
                    message: message("post","Student"),
                    student: student
                })
            }
        })
    });

    app.put(`/${path}/:id`, (req, res)=>{
        let id = req.params.id;
        let studentObject = req.body;

        //Using ``REQ-HANDLER`` TO HANDLE ALL THE USERS PUT REQUEST
        const validator = studentSchema.validate(studentObject);
        if(validator.error) return res.send(validator);

        StudentModel.where({ _id: id }).update(studentObject).exec((err, info) => {
            if(err){
                res.send(`Error Updating Student \n${err}`);
            }else{
                res.send({
                    message: message("put","Student"),
                    student: studentObject,
                    info:info
                });
            }
        });
    })

    app.delete(`/${path}/:id`, (req, res)=>{
        let id = req.params.id;

        StudentModel.where({ _id: id }).remove().exec((err, student) => {
            if(err){
                res.send(`Error Deleting Student \n${err}`);
            }else{
                res.send({
                    // item,
                    message: message("delete","Student"),
                    student: student
                });
            }
        });
    })

}
