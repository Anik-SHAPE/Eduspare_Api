const Note=require("../models/notes");


exports.getNoteById=(req,res,next,id)=>{
    Note.findById(id).exec((err,note)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        req.note=note;
        next();
    });
};

exports.getNote=(req,res)=>{
    res.json(req.note);
};

exports.getAllNoteByContent=(req,res)=>{
    let contentbank=req.contentbank;
    Note.find({_id:contentbank.noteList}).exec((err,notes)=>{
        if(err){
            return res.status(400).json({
                error: "Error in DB"
            });
        }
        res.json(notes);
    });
};

exports.createNotePushContent=(req,res)=>{
    let note = new Note(req.body);
    let contentbank=req.contentbank;
    
     note.save((err,note)=>{
         if(err){
          return res.status(400).json({
              err: "NOT be able to conect with the DB"
          });
         }
         contentbank.noteList.push(note._id);
         contentbank.save((err,contentbank)=>{
             if(err){
                 return res.status(400).json({
                     error: "Error in DB"
                 });
             }
            res.json(note);
          
         });
     });
};


exports.removeNotePopContent=(req,res)=>{
  
    let contentbank=req.contentbank;
    let note=req.note;

    note.remove((err,n)=>{
       if(err){
           return res.status(400).json({
               error: "DELETION IS NOT SUCCESSDFULL"
           });
       }
       
       var index=contentbank.noteList.indexOf(n._id);
       if (index > -1) {
          contentbank.noteList.splice(index, 1);
       }
                                                                                                                                                                                                                                                   
       contentbank.save((err,contentbank)=>{
           if(err){
               return res.status(400).json({
                   error: "Error to save in DB"
               });
           }
          res.json({
              contentbank,
              n
          });
       });
    }); 
};

exports.updateNote=(req,res)=>{

 Note.findOneAndUpdate(
    {_id:req.note._id},
    {$set:req.body},
    {new: true, useFindAndModify: false},
    (err,note)=>{
        if(err){
            return res.status(400).json({
                error: "Error to connect with Note DB"
            });
        }
       res.json(note);
    }
   );
};


exports.getAllHomeWorkNote=(req,res)=>{
   let contentbank=req.contentbank;
   Note.find({_id:contentbank.noteList,homework:true}).exec((err,notes)=>{
     if(err){
       return res.status(400).json({
         error: "Error in DB"
       });
     }
    res.json(notes);
   });
};


exports.getAllPreHomorkNote=(req,res)=>{
  let contentbank=req.contentbank;
  Note.find({_id:contentbank.noteList,homework:false}).exec((err,notes)=>{
    if(err){
      return res.status(400).json({
        error: "Error in DB"
      });
    }
   res.json(notes);
  });
};
