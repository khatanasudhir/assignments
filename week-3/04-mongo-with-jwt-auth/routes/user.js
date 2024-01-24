const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

// User Routes

router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const passsword = req.body.passsword;

    await User.create({
        username,
        passsword
    })
    res.json({
        message: "User Created successfully"
    })
});


router.post('/signin', async (req, res) => {
    // Implement admin signup logic
     // Implement user signin logic
     const username = req.body.username;
     const password = req.body.password;
 
     const user = await User.find({
        username,
        password
    })
 
     if (user) {
        // create and signin json web token
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({
            message: "Signin successful",
            token
        });
     } else{
        res.status(411).json({
            message: "Incorrect username and password"
        })
     }

});


router.get('/courses', async (req, res) => {

    // Implement listing all courses logic
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({
        courses
    });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const username = req.username;
    // Implement course purchase logic
    const courseId = req.params.courseId;
    // Perform the purchase logic, you can customize this based on your requirements
    // For example, add the course to the user's purchased courses list

    res.json({
        message: `Course with ID ${courseId} purchased successfully by ${username}`
    });
});



router.get('/purchasedCourses', userMiddleware, async (req, res) => {

    // Implement fetching purchased courses logic
    const username = req.username;

    // Fetch the user's purchased courses, you need to customize this based on your database schema
    const user = await User.findOne({
        where: {
            username
        }
        // Include logic to fetch purchased courses based on your database schema
        // You may have a separate table to store purchased courses or a field in the User table
    });

    const purchasedCourses = user ? user.purchasedCourses : [];

    res.json({
        purchasedCourses
    });
});

module.exports = router