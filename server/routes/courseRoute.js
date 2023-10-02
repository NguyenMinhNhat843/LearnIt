const express = require('express');
const router = express.Router();

const {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    sortCourses,
    searchCourse,
} = require('../controller/courseController');

router.route('/')
    .get(getAllCourses)
    .post(createCourse);

router.route('/sort').get(sortCourses);
router.route('/search').post(searchCourse);

router.route('/:id')
    .get(getSingleCourse)
    .patch(updateCourse)
    .delete(deleteCourse);


module.exports = router;