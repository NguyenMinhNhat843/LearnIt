const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../error/bad-request');
const NotFoundError = require('../error/not-found');

const getAllCourses = async (req, res) => {   
    try {
        const courses = await Course
        .find({
            createBy: req.user.userId
        })
        .populate('createBy', ['username']);

        res.status(200)
            .json({courses});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const getSingleCourse = async (req, res) => {
    try {
        const {
            params: {id},
            user: {userId}
        } = req;

        const course = await Course.findOne({
            _id: id,
            createBy: userId
        });

        if(!course) {
            throw new BadRequestError(`No course with id ${id}`);
        }

        res.status(200)
            .json({ course });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const createCourse = async (req, res) => {
    try {
        const {
            url
        } = req.body;


        req.body.createBy = req.user.userId;
        const course = await Course.create({
            ...req.body,
            url: url.startsWith('https://') ? url : `https://${url}`,
        });
        res.status(StatusCodes.CREATED)
            .json({course});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const updateCourse = async (req, res) => {
    try {
        const {
            params: {id},
            user: {userId},
        } = req;

        const course = await Course.findOneAndUpdate(
            {
                _id: id,
                createBy: userId
            },
            req.body,
            {new: true, runValidators: true}
        );

        if(!course) {
            throw new BadRequestError(`No course with id ${id}`);
        }

        res.status(200)
            .json({ course });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete(
            {
                _id: req.params.id,
                createBy: req.user.userId
            }
        )

        if(!course) {
            // throw new BadRequestError(`No course with id ${req.params.id}`);
            return res.status(400).json({message: 'bad resquest'});
        }

        res.status(200)
            .json({
                message: 'delete successfully',
                course
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const sortCourses = async (req, res) => {
    try {
        // console.log(req.query.sortField, req.query.sortType);
        const sortField = req.query.sortField || 'title';
        const sortType = req.query.sortType || 'asc';

        const CoursesSorted = await Course
            .find({createBy: req.user.userId})
            .sort({[sortField]: sortType});

        // console.log(CoursesSorted);

        return res.status(200).json({
            CoursesSorted,
        })
    } catch (error) {
        // console.log('error');
        console.log(error);
        res.status(500).json({message: 'Internal server error!!!'});
    }
}

const searchCourse = async (req, res) => {
    try {
        console.log(req.body);
        const keySearch = req.body;
        const coursesMatchKey = await Course.find(
            {
                createBy: req.user.userId,
                title: keySearch.key
            }
        )
            // console.log(coursesMatchKey);
        if(coursesMatchKey.length === 0) {
            res.status(400).json({message: 'No course match!!!'});
        } else {
            return res.status(200).json({coursesMatchKey});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal error serer!!!'});
    }
}

module.exports = {
    getAllCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    sortCourses,
    searchCourse,
}