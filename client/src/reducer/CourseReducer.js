import {
    GET_ALL_COURSES,
    COURSE_LOADED_FAIL,
    ADD_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
    FIND_COURSE,
    SORT_COURSES,
    SEARCH_COURSE
} from '../contexts/constant'

export const courseReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_ALL_COURSES: 
        {
            return {
                ...state,
                courses: payload,
                courseLoading: false,
            }
        }
        case COURSE_LOADED_FAIL: {
            return {
                ...state,
                courses: [],
                courseLoading: false
            }
        }
        case ADD_COURSE: {
            return {
                ...state,
                courses: [
                    ...state.courses,
                    payload,
                ]
            }
        }
        case DELETE_COURSE: {
            return {
                ...state,
                courses: state.courses.filter(course => course._id !== payload),
            }
        }
        case FIND_COURSE: {
            return {
                ...state,
                updateCourseContext: payload
            }
        }
        case UPDATE_COURSE: {
            const newCourses = state.courses.map(course => {
                if(course._id === payload._id) return payload;
                return course;
            })


            return {
                ...state,
                courses: newCourses
            }
        }
        case SORT_COURSES: {
            // console.log('sorting');
            const result = {
                ...state,
                courses: payload
            }

            // console.log(result)
            return result;
        }
        case SEARCH_COURSE: {
            const result = {
                ...state,
                courses: payload.coursesMatchKey,
            }

            return result;
        }
        default: 
            return state;
    }
}

