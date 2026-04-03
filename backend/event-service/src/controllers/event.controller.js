// // const Event = require("../models/event");
// // const axios = require("axios");
// // const getSystemSettings = require("../utils/systemSettings");

// // /*
// // ====================================================
// // EVENT STATS
// // ====================================================
// // */
// // exports.getEventStats = async (req, res, next) => {
// //   try {

// //     const totalEvents = await Event.countDocuments();

// //     const today = new Date();
// //     today.setHours(0,0,0,0);

// //     const tomorrow = new Date(today);
// //     tomorrow.setDate(today.getDate()+1);

// //     const activeEvents = await Event.countDocuments({
// //       date:{ $gte: today, $lt: tomorrow }
// //     });

// //     const upcomingEvents = await Event.countDocuments({
// //       date:{ $gte: tomorrow }
// //     });

// //     const events = await Event.find();

// //     const registrations = events.reduce((total,event)=>{
// //       return total + (event.participants?.length || 0)
// //     },0)

// //     res.status(200).json({
// //       success:true,
// //       data:{
// //         totalEvents,
// //         activeEvents,
// //         upcomingEvents,
// //         registrations
// //       }
// //     })

// //   } catch(error){
// //     next(error)
// //   }
// // }


// // /*
// // ====================================================
// // CREATE EVENT
// // ====================================================
// // */
// // exports.createEvent = async (req,res,next)=>{

// //   try{

// //     const settings = await getSystemSettings()

// //     if(settings?.access?.maintenanceMode && req.user.role !== "admin"){
// //       return res.status(403).json({
// //         success:false,
// //         message:"Platform under maintenance"
// //       })
// //     }

// //     const event = await Event.create({
// //       ...req.body,
// //       createdBy:req.user.id,
// //       organizerName:req.user.firstName,
// //       capacity:req.body.capacity || settings?.events?.defaultEventCapacity || 100
// //     })

// //     res.status(201).json({
// //       success:true,
// //       data:event
// //     })

// //   }catch(error){
// //     next(error)
// //   }

// // }


// // /*
// // ====================================================
// // GET ALL EVENTS
// // ====================================================
// // */
// // exports.getAllEvents = async (req,res,next)=>{

// //   try{

// //     const events = await Event.find().sort({createdAt:-1})

// //     res.status(200).json({
// //       success:true,
// //       data:events
// //     })

// //   }catch(error){
// //     next(error)
// //   }

// // }


// // /*
// // ====================================================
// // GET EVENT BY ID
// // ====================================================
// // */
// // exports.getEventById = async (req,res,next)=>{

// //   try{

// //     const event = await Event.findById(req.params.id)

// //     if(!event){
// //       return res.status(404).json({
// //         success:false,
// //         message:"Event not found"
// //       })
// //     }

// //     res.status(200).json({
// //       success:true,
// //       data:event
// //     })

// //   }catch(error){
// //     next(error)
// //   }

// // }


// // /*
// // ====================================================
// // UPDATE EVENT
// // ====================================================
// // */
// // exports.updateEvent = async (req,res,next)=>{

// //   try{

// //     const event = await Event.findById(req.params.id)

// //     if(!event){
// //       return res.status(404).json({
// //         success:false,
// //         message:"Event not found"
// //       })
// //     }

// //     const updatedEvent = await Event.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new:true, runValidators:true }
// //     )

// //     res.status(200).json({
// //       success:true,
// //       data:updatedEvent
// //     })

// //   }catch(error){
// //     next(error)
// //   }

// // }


// // /*
// // ====================================================
// // DELETE EVENT
// // ====================================================
// // */
// // exports.deleteEvent = async (req,res,next)=>{

// //   try{

// //     const event = await Event.findById(req.params.id)

// //     if(!event){
// //       return res.status(404).json({
// //         success:false,
// //         message:"Event not found"
// //       })
// //     }

// //     await event.deleteOne()

// //     res.status(200).json({
// //       success:true,
// //       message:"Event deleted successfully"
// //     })

// //   }catch(error){
// //     next(error)
// //   }

// // }


// // /*
// // ====================================================
// // REGISTER FOR EVENT
// // ====================================================
// // */
// // exports.registerForEvent = async (req,res,next)=>{

// //   try{

// //     const event = await Event.findById(req.params.id)

// //     if(!event){
// //       return res.status(404).json({
// //         success:false,
// //         message:"Event not found"
// //       })
// //     }

// //     const already = event.participants.some(
// //       p => p.userId.toString() === req.user.id
// //     )

// //     if(already){
// //       return res.status(400).json({
// //         success:false,
// //         message:"Already registered"
// //       })
// //     }

// //     if(event.participants.length >= event.capacity){
// //       return res.status(400).json({
// //         success:false,
// //         message:"Event full"
// //       })
// //     }

// //     event.participants.push({
// //       userId:req.user.id,
// //       name:`${req.user.firstName} ${req.user.lastName}`,
// //       college:req.user.college || "",
// //       registrationDate:new Date()
// //     })

// //     await event.save()

// //     try{
// //       await axios.post("http://localhost:8004/initialize",{
// //         eventId:event._id,
// //         userId:req.user.id
// //       })
// //     }catch(err){
// //       console.log("Leaderboard service unavailable")
// //     }

// //     res.status(200).json({
// //       success:true,
// //       message:"Registered successfully"
// //     })

// //   }catch(error){
// //     next(error)
// //   }

// // }


// // /*
// // ====================================================
// // CANCEL REGISTRATION
// // ====================================================
// // */
// // exports.cancelRegistration = async (req,res,next)=>{

// //   try{

// //     const event = await Event.findById(req.params.id)

// //     if(!event){
// //       return res.status(404).json({
// //         success:false,
// //         message:"Event not found"
// //       })
// //     }

// //     event.participants = event.participants.filter(
// //       p => p.userId.toString() !== req.user.id
// //     )

// //     await event.save()

// //     res.status(200).json({
// //       success:true,
// //       message:"Registration cancelled"
// //     })

// //   }catch(error){
// //     next(error)
// //   }

// // }


// // /*
// // ====================================================
// // GET EVENT PARTICIPANTS
// // ====================================================
// // */
// // exports.getEventParticipants = async (req,res,next)=>{

// //   try{

// //     const event = await Event.findById(req.params.id)

// //     if(!event){
// //       return res.status(404).json({
// //         success:false,
// //         message:"Event not found"
// //       })
// //     }

// //     res.status(200).json({
// //       success:true,
// //       participants:event.participants || []
// //     })

// //   }catch(error){
// //     next(error)
// //   }

// // }

// const Event = require("../models/event");
// const axios = require("axios");

// /*
// EVENT STATS
// */
// exports.getEventStats = async (req,res,next)=>{
//   try{

//     const totalEvents = await Event.countDocuments()

//     const today = new Date()
//     today.setHours(0,0,0,0)

//     const tomorrow = new Date(today)
//     tomorrow.setDate(today.getDate()+1)

//     const activeEvents = await Event.countDocuments({
//       date:{ $gte:today, $lt:tomorrow }
//     })

//     const upcomingEvents = await Event.countDocuments({
//       date:{ $gte:tomorrow }
//     })

//     const events = await Event.find()

//     const registrations = events.reduce((total,event)=>{
//       return total + (event.participants?.length || 0)
//     },0)

//     res.status(200).json({
//       success:true,
//       totalEvents,
//       activeEvents,
//       upcomingEvents,
//       registrations
//     })

//   }catch(error){
//     next(error)
//   }
// }


// /*
// CREATE EVENT
// */
// exports.createEvent = async (req,res,next)=>{
//   try{

//     const event = await Event.create({
//       ...req.body,
//       createdBy:req.user.id,
//       organizerName:req.user.firstName
//     })

//     res.status(201).json({
//       success:true,
//       data:event
//     })

//   }catch(error){
//     next(error)
//   }
// }


// /*
// GET ALL EVENTS
// */
// exports.getAllEvents = async (req,res,next)=>{
//   try{

//     const events = await Event.find().sort({createdAt:-1})

//     res.status(200).json({
//       success:true,
//       data:events
//     })

//   }catch(error){
//     next(error)
//   }
// }


// /*
// GET EVENT BY ID
// */
// exports.getEventById = async (req,res,next)=>{
//   try{

//     const event = await Event.findById(req.params.id)

//     if(!event){
//       return res.status(404).json({
//         success:false,
//         message:"Event not found"
//       })
//     }

//     res.status(200).json({
//       success:true,
//       data:event
//     })

//   }catch(error){
//     next(error)
//   }
// }


// /*
// UPDATE EVENT
// */
// exports.updateEvent = async (req,res,next)=>{
//   try{

//     const event = await Event.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new:true}
//     )

//     res.status(200).json({
//       success:true,
//       data:event
//     })

//   }catch(error){
//     next(error)
//   }
// }


// /*
// DELETE EVENT
// */
// exports.deleteEvent = async (req,res,next)=>{
//   try{

//     await Event.findByIdAndDelete(req.params.id)

//     res.status(200).json({
//       success:true,
//       message:"Event deleted"
//     })

//   }catch(error){
//     next(error)
//   }
// }


// /*
// REGISTER FOR EVENT
// */
// exports.registerForEvent = async (req,res,next)=>{

//   try{

//     const event = await Event.findById(req.params.id)

//     if(!event){
//       return res.status(404).json({
//         success:false,
//         message:"Event not found"
//       })
//     }

//     const already = event.participants.some(
//       p=>p.userId.toString()===req.user.id
//     )

//     if(already){
//       return res.status(400).json({
//         success:false,
//         message:"Already registered"
//       })
//     }

//     if(event.participants.length >= event.capacity){
//       return res.status(400).json({
//         success:false,
//         message:"Event full"
//       })
//     }

//     const {name,email,specialRequirements} = req.body

//     event.participants.push({
//       userId:req.user.id,
//       name:name || `${req.user.firstName} ${req.user.lastName}`,
//       email:email || req.user.email,
//       college:req.user.college || "",
//       specialRequirements:specialRequirements || "",
//       registrationDate:new Date()
//     })

//     await event.save()

//     try{

//       await axios.post("http://localhost:8004/initialize",{
//         eventId:event._id,
//         userId:req.user.id
//       })

//     }catch(err){
//       console.log("Leaderboard service unavailable")
//     }

//     res.status(200).json({
//       success:true,
//       message:"Registered successfully"
//     })

//   }catch(error){
//     next(error)
//   }

// }


// /*
// CANCEL REGISTRATION
// */
// exports.cancelRegistration = async (req,res,next)=>{
//   try{

//     const event = await Event.findById(req.params.id)

//     event.participants = event.participants.filter(
//       p=>p.userId.toString()!==req.user.id
//     )

//     await event.save()

//     res.status(200).json({
//       success:true,
//       message:"Registration cancelled"
//     })

//   }catch(error){
//     next(error)
//   }
// }


// /*
// GET EVENT PARTICIPANTS
// */
// exports.getEventParticipants = async (req,res,next)=>{
//   try{

//     const event = await Event.findById(req.params.id)

//     res.status(200).json({
//       success:true,
//       participants:event.participants || []
//     })

//   }catch(error){
//     next(error)
//   }
// }

const Event = require("../models/Event");
const axios = require("axios");

/*
====================================================
EVENT STATS
====================================================
*/
exports.getEventStats = async (req, res) => {
  try {

    const totalEvents = await Event.countDocuments();

    const today = new Date();
    today.setHours(0,0,0,0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const activeEvents = await Event.countDocuments({
      date: { $gte: today, $lt: tomorrow }
    });

    const upcomingEvents = await Event.countDocuments({
      date: { $gte: tomorrow }
    });

    const events = await Event.find();

    const registrations = events.reduce((total,event)=>{
      return total + (event.participants?.length || 0)
    },0);

    res.status(200).json({
      success:true,
      totalEvents,
      activeEvents,
      upcomingEvents,
      registrations
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to fetch event stats"
    });

  }
};


/*
====================================================
CREATE EVENT
====================================================
*/
exports.createEvent = async (req,res)=>{

  try{

    const event = await Event.create({
      ...req.body,
      createdBy:req.user.id,
      organizerName:req.user.firstName
    });

    res.status(201).json({
      success:true,
      data:event
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Event creation failed"
    });

  }

};


/*
====================================================
GET ALL EVENTS
====================================================
*/
exports.getAllEvents = async (req,res)=>{

  try{

    const events = await Event.find().sort({createdAt:-1});

    res.status(200).json({
      success:true,
      data:events
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to fetch events"
    });

  }

};


/*
====================================================
GET EVENT BY ID
====================================================
*/
exports.getEventById = async (req,res)=>{

  try{

    const event = await Event.findById(req.params.id);

    if(!event){
      return res.status(404).json({
        success:false,
        message:"Event not found"
      });
    }

    res.status(200).json({
      success:true,
      data:event
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to fetch event"
    });

  }

};


/*
====================================================
UPDATE EVENT
====================================================
*/
exports.updateEvent = async (req,res)=>{

  try{

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.status(200).json({
      success:true,
      data:event
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to update event"
    });

  }

};


/*
====================================================
DELETE EVENT
====================================================
*/
exports.deleteEvent = async (req,res)=>{

  try{

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success:true,
      message:"Event deleted"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to delete event"
    });

  }

};


/*
====================================================
REGISTER FOR EVENT
====================================================
*/
exports.registerForEvent = async (req,res)=>{

  try{

    const event = await Event.findById(req.params.id);

    if(!event){
      return res.status(404).json({
        success:false,
        message:"Event not found"
      });
    }

    const already = event.participants.some(
      p=>p.userId.toString() === req.user.id
    );

    if(already){
      return res.status(400).json({
        success:false,
        message:"Already registered"
      });
    }

    if(event.participants.length >= event.capacity){
      return res.status(400).json({
        success:false,
        message:"Event full"
      });
    }

    const {name,email,specialRequirements} = req.body;

    event.participants.push({
      userId:req.user.id,
      name:name || `${req.user.firstName} ${req.user.lastName}`,
      email:email || req.user.email,
      college:req.user.college || "",
      specialRequirements:specialRequirements || "",
      registrationDate:new Date()
    });

    await event.save();

    try{

      await axios.post("http://localhost:8000/api/leaderboard/initialize",{
        eventId:event._id,
        userId:req.user.id,
        userName:`${req.user.firstName} ${req.user.lastName}`,
        college:req.user.college
      });

    }catch(err){
      console.log("Leaderboard init failed");
    }

    res.status(200).json({
      success:true,
      message:"Registered successfully"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Registration failed"
    });

  }

};


/*
====================================================
CANCEL REGISTRATION
====================================================
*/
exports.cancelRegistration = async (req,res)=>{

  try{

    const event = await Event.findById(req.params.id);

    event.participants = event.participants.filter(
      p=>p.userId.toString() !== req.user.id
    );

    await event.save();

    res.status(200).json({
      success:true,
      message:"Registration cancelled"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Cancellation failed"
    });

  }

};


/*
====================================================
GET EVENT PARTICIPANTS
====================================================
*/
exports.getEventParticipants = async (req,res)=>{

  try{

    const event = await Event.findById(req.params.id);

    res.status(200).json({
      success:true,
      participants:event.participants || []
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to fetch participants"
    });

  }

};
