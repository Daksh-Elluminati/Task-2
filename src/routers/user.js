const express = require('express');
const User = require('../models/user.js');
const { ObjectId } = require('mongodb');
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');

const router = new express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + " " + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

/*const upload = multer({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload a jpg, jpeg or png file only'));
        }
        cb(undefined, true)
    },    
    filename: function (req, file, cb) {
        
        cb(null, file.originalname + Date.now());
    }
})*/


router.get('', async (req,res) => {
    res.render('index',{
        title: 'User database'
    })
})

router.get('/addUser', async (req,res) => {
    res.render('index',{
        title: 'Add User'
    })
})

/** Add a new user */
router.post('/addUser', upload.single('avatar'),async (req,res) => {
    if (req.file) {
        req.body.avatar = req.file.filename
    }
    else{
        req.body.avatar = ""
    }
    
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user);
    } catch (error) {

        if (error.errors && error.errors.email) {
            res.status(400).send({message: error.errors.email.message});
        } else if (error.errors && error.errors.phone.message) {
            res.status(400).send({message: error.errors.phone.message});
        } else if (error.keyValue && error.keyValue.email) {
            res.status(400).send({message: "Email is already registered"})
        } else if (error.keyValue && error.keyValue.phone) {
            res.status(400).send({message: 'phone number is already registered'})
        }
    }
})

/** Read all the user */
router.get('/readUser', async (req,res) => {

    // res.render('404',{
    //     title: 'Reading User',
    //     errorMessage: 'It is working'
    // })

    let users = await User.find({}).skip(req.query.skip).limit(req.query.limit);

    users.push({count: users.length})
    res.send(users);
})

/** Read user by id */
router.get('/findUserData', async (req,res) => {
    const data = req.query.data;
    let dataID;

    if (typeof data === 'string' && (data.length == 12 || data.length == 24) && ObjectId.isValid(data)) {
        dataID = new ObjectId(data);
    }
    
    try {
        const searchQuery = req.query.data;
        const regext = new RegExp(searchQuery,"i");

        const user = await User.find({ $or: [
            {name: regext},
            {phone: regext},
            {email: regext},
            {_id: dataID},
        ]}).skip(req.query.skip).limit(req.query.limit)

        if(user.length === 0){
            return res.status(404).send({message: "No record found"});
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({error});
    }
})

/**Update user */
router.patch('/user/:id', upload.single('avatar'), async (req,res) => {
    
    try {
        let updates = Object.keys(req.body)
        
        const allowedUpdates = ["name", "email", "phone"];
        const isValidOpertaion = updates.every((update) => allowedUpdates.includes(update));
        
        if (!isValidOpertaion) {
            res.status(400).send('Invalid updates')
        }

        const user = await User.findOne({_id: req.params.id})
        if (!user) {
            return res.status(404).send('user not found');
        }
        
        
        if (req.file) {
            if (user.avatar) {
                fs.unlink("public/images/" + user.avatar, (err) => {
                    /**Without this function file is not deleted */
                  });
            }
            user.avatar = req.file.filename
        }

        

        updates.forEach((update) => user[update] = req.body[update])


        await user.save();

        res.status(201).send(user);
    } catch (error) {
        
        if (error.errors && error.errors.email) {
            res.status(400).send({message: error.errors.email.message});
        } else if (error.errors && error.errors.phone.message) {
            res.status(400).send({message: error.errors.phone.message});
        } else if (error.keyValue && error.keyValue.email) {
            res.status(400).send({message: "Email is already registered"})
        } else if (error.keyValue && error.keyValue.phone) {
            res.status(400).send({message: 'phone number is already registered'})
        }
    }
})

router.delete('/user/:id', async (req,res) => {
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id})
        // const user = await User.findById({_id: req.params.id})
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.avatar) {
            fs.unlink("public/images/" + user.avatar, (err) => {
                /**Without this function file is not deleted */
              });
        }
        
        res.send(user)

    } catch (error) {
        res.status(500).send("Server error")
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send("No avatar");
    }
})

router.get('/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Oops!! you have lost your path'
    })
});

module.exports = router