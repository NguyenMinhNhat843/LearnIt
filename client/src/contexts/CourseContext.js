import { createContext, useReducer, useState } from 'react'
import { courseReducer } from '../reducer/CourseReducer';
import {
    apiurl,
    GET_ALL_COURSES,
    COURSE_LOADED_FAIL,
    ADD_COURSE,
    DELETE_COURSE,
    UPDATE_COURSE,
    FIND_COURSE,
    SORT_COURSES,
    SEARCH_COURSE
} from './constant';
import axios from 'axios';

export const courseContext = createContext();

const CourseContextProvider = ({ children }) => {
    // reducer
    const [courseState, dispatch] = useReducer(courseReducer, {
        updateCourseContext: {
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        },
        courses: [],
        courseLoading: true,
    })

    // use state
    const [showModalAddCourse, setShowModalAddCourse] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    })
    const [showConfirmDelete, setShowConfirmDelete] = useState({
        show: false,
        courseId: null,
    });
    const [showUpdateCourseModal, setShowUpdateCourseModal]
        = useState(false);
    const [sortField, setSortField] = useState('title');
    const [sortType, setSortType] = useState('asc');

    // find course to update
    const findCourse = (courseId) => {
        const course = courseState.courses.find(course => course._id === courseId)

        dispatch({
            type: FIND_COURSE,
            payload: course 
        })
    }
    
    // get all course
    const getAllCourse = async () => {
        try {
            const response = await axios.get(`${apiurl}/course`);

            if(response.status === 200) {
                dispatch({
                    type: GET_ALL_COURSES,
                    payload: response.data.courses
                })
            }
        } catch (error) {
            dispatch({
                type: COURSE_LOADED_FAIL,
            })
        }
    }

    //add course
    const addCourse = async (newCourse) => {
        try {
            const response = await axios.post(`${apiurl}/course`, newCourse)
        
            if(response.status === 201) {
                dispatch({
                    type: ADD_COURSE,
                    payload: response.data.course
                })
            }
            return response;
        } catch (error) {
            return error.response.data ? error.response.data : error;
        }
    }

    // deleteCourse
    const deleteCourse = async (courseId) => {
        try {
            const response = await axios.delete(`${apiurl}/course/${courseId}`);
        
            if(response.status === 200) {
                dispatch({
                    type: DELETE_COURSE,
                    payload: courseId
                })
            }
        } catch (error) {
            return error.response.data ? error.response.data : error;
        }
    }

    // updateCourse
    const updateCourse = async (updateCourse) => {
        try {
            const response = await axios.patch(`${apiurl}/course/${updateCourse._id}`, updateCourse);

            if(response.status === 200) {
                dispatch({
                    type: UPDATE_COURSE,
                    payload: updateCourse,
                })
            }

            return response;
        } catch (error) {
            return error.response.data ? error.response.data : error;
        }
    }

    // sort courses
    const sortCourses = async (a, b) => {
        try {
            // console.log(a, b);
            const response = await axios.get(`${apiurl}/course/sort?sortField=${a}&sortType=${b}`);
            
            if(response.status === 200) {
                dispatch({
                    type: SORT_COURSES,
                    payload: response.data.CoursesSorted,
                })
            }
             
            return response.data.CoursesSorted;
        } catch (error) {
            return error.response.data ? error.response.data : error;
        }
    }

    // search context 
    const searchCourse = async (keySearch) => {
        try {
            console.log(keySearch);
            const response = await axios.post(`${apiurl}/course/search`, keySearch);
            console.log(response);
            if(response.status === 200) {
                dispatch({
                    type: SEARCH_COURSE,
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const courseContextData = {
        courseContext,
        courseState,
        getAllCourse,
        showModalAddCourse,
        setShowModalAddCourse,
        addCourse,
        deleteCourse,
        updateCourse,
        showToast,
        setShowToast,
        showConfirmDelete,
        setShowConfirmDelete,
        setShowUpdateCourseModal,
        showUpdateCourseModal,
        findCourse,
        sortField,
        setSortField,
        sortType,
        setSortType,
        sortCourses,
        searchCourse
    }

    return (
        <courseContext.Provider value={courseContextData}>
            {children}
        </courseContext.Provider>
    )
}

export default CourseContextProvider;