const express = require('express');
const Router = require('../Models/enrollModel');
const Model = require('../Models/enrollModel');
const verifyToken = require('../Middleware/verifyToken');

const router = express.Router();

// router.post('/add', verifyToken, (req, res) => {
//     req.body.user = req.user._id;
//     console.log(req.body);
//     new Model(req.body).save()
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// getall
router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/user', verifyToken, (req, res) => {

    Model.find({user : req.user._id})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/checkenrolled/:projectid', verifyToken, (req, res) => {

    Model.find({ project: req.params.projectid, user: req.user._id })
        .then((result) => {
            if (!result) {
                res.status(404).json({ message: 'No enrollment found for the given project and user.' });
            } else {
                res.status(200).json({
                    "isEnrolled": true
                  });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// getbyid
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update
router.put('/update/:id', (req, res) => {

    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/add', async (req, res) => {
  try {
    const { user, project } = req.body;

    // Check if already enrolled
    const existingEnrollment = await Model.findOne({ user, project });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already applied for this project' });
    }

    // Create new enrollment
    const enrollment = new Model({
      user,
      project
    });

    await enrollment.save();

    // Populate user and project details
    const populatedEnrollment = await Model.findById(enrollment._id)
      .populate('user', 'name email')
      .populate('project', 'title description');

    res.status(201).json({
      message: 'Successfully applied',
      enrollment: populatedEnrollment
    });

  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Failed to process enrollment' });
  }
});

module.exports = router;