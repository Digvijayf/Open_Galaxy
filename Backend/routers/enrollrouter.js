const express = require('express');
const Router = require('../Models/enrollModel');
// const { Model } = require('mongoose');
const Model = require('../Models/enrollModel');
const verifyToken = require('../Middleware/verifyToken');

const router = express.Router();

router.post('/add', verifyToken, (req, res) => {
    req.body.user = req.user._id;
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// getall
//router.get('/getall', (req, res) => {
// res.send('response from user getall');
router.get('/getall', (req, res) => {

    Model.find()
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
//router.get('/getbyid', (req, res) => {
//res.send('response from user getbyid');
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
//router.get('/update', (req, res) => {
//res.send('response from user update');
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
//router.get('/delete', (req, res) => {
//res.send('response from user delete');
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

const enrollInProject = async (projectId) => {
  try {
    // Check if the user is already enrolled by calling the checkenrolled endpoint
    const checkResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/project/checkenrolled/${projectId}`,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (checkResponse.status === 200 && checkResponse.data.isEnrolled) {
      alert('You are already enrolled in this project.');
      return;
    }

    // Make the enrollment request
    const enrollResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/project/enroll`,
      { projectId },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (enrollResponse.status === 200) {
      alert('Successfully enrolled in the project!');
      // Update the state to reflect the enrollment
      setInternships((prevInternships) =>
        prevInternships.map((internship) =>
          internship.id === projectId
            ? { ...internship, isEnrolled: true }
            : internship
        )
      );
    } else {
      alert('Failed to enroll in the project. Please try again.');
    }
  } catch (error) {
    console.error('Error enrolling in project:', error);
    alert('An error occurred while enrolling in the project. Please try again later.');
  }
};

module.exports = router;