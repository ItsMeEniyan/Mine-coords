const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const world = require("../Model/worldSchema");

function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader!= "undefined"){
    const bearer = bearerHeader.split(' ');
    const bearertoken = bearer[1];
    req.token = bearertoken;
    next();
  }else{
    res.sendStatus(403);
  }
}

//This router is to get all the world names
router.get("/name",passport.authenticate("jwt",{session:false}), async (req, res) => {
  
      
      try {
        const worlds = await world.find({"googleId":req.user.googleId});
        console.log(req.user.googleId)
        res.json(worlds);
      } catch (err) {
        res.send(err);
      }
    
  
});

//This router is the get all the coords of a particular world
router.get("/coord", async (req, res) => {
  try {
    const thatworld = await world.findById(req.query.worldid);
    //{console.log(req.query.worldid)}
    res.json(thatworld)
    //{res.send(req.body)}
  } catch (err) {
    res.send(err);
  }
});

//This router is for creating new world
router.post("/",passport.authenticate("jwt",{session:false}), async (req, res) => {
  
      
      const newworld = new world({
        worldname: req.body.worldname,
        googleId: req.user.googleId
      });
      
      console.log(req.user);
      try {
        const temp = await newworld.save();
        //res.json(temp);
        res.send(temp._id);
      } catch (err) {
        res.send(err);
      }
    
  
});

// This router is for adding new coordinates to the existing world
router.put("/addcoord", async (req, res) => {
  try {
    const thatworld = await world.findById(req.body.worldid);
    //res.json(thatworld);
    const coordarray = {
      coordname: req.body.coordname,
      coord: { x: req.body.x, y: req.body.y },
    };
    //res.json(coordarray);
    thatworld.coords.push(coordarray);
    await thatworld.save();

    res.send(thatworld.coords[(thatworld.coords.length)-1]);
  } catch (err) {
    res.send(err);
  }
});

// this router is for editing world name
router.patch("/editworld", async (req, res) => {
  try {
    const thatworld = await world.findById(req.body.worldid);

    thatworld.worldname = req.body.worldname;
    await thatworld.save();
    res.send("Edited " + req.body.worldname);
  } catch (err) {
    res.send(err);
  }
});

// This router is for editing coordinates and its names
router.patch("/editcoord", async (req, res) => {
  const thatworld = await world.findById(req.body.worldid);
  //const thatcoord = await thatworld.coords.findById(req.body.coordid);
  //const thatcoord = await world.findById(req.body.coordid);
  //const thatcoord = await world.find({ "coords._id": req.body.coordid });
  //await world.update({"_id" : req.body.worldid, "coord._id" : req.body.coordid},{$set : {"coord.$.coordname" : req.body.coordname}})
  //res.send("hai");
  /*{const thatcoord = await thatworld.find({
    "_id": (req.body.coordid)
})}*/
  const coordindex = thatworld.coords.findIndex((x)=>{
    return x._id== req.body.coordid;
  });
  //res.json(thatworld.coords[coordindex]);
  //res.json(thatworld.coords[coordindex]);

  try {
    if(req.body.coordname!=undefined)
    thatworld.coords[coordindex].coordname = req.body.coordname;
    if(req.body.x!=undefined)
    thatworld.coords[coordindex].coord.x = req.body.x;
    if(req.body.y!=undefined)
    thatworld.coords[coordindex].coord.y = req.body.y;
    //thatcoord.coord.x = req.body.x;
    //thatcoord.coord.y = req.body.y;
    //await thatcoord.save();
    await thatworld.save();
    
    res.send("Successfully updated " );
    
  } catch (err) {
    res.send(err);
  }
});

router.delete("/deleteworld", async (req, res) => {
  try {
    const thatworld = await world.findById(req.body.worldid);

    await thatworld.remove();
    res.send("Successfully deleted" + thatworld.worldname);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/deletecoord", async (req, res) => {
  try {
    const thatworld = await world.findById(req.body.worldid);

    const coordindex = thatworld.coords.findIndex((x)=>{
      return x._id== req.body.coordid;
    });

    thatworld.coords.pull(req.body.coordid);
    await thatworld.save();
    
    res.send("Successfully deleted");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
