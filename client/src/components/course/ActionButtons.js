import playIcon from '../../assests/play-btn.svg'
import editIcon from '../../assests/pencil.svg'
import deleteIcon from '../../assests/trash.svg'
import { Button } from 'react-bootstrap'
import { useContext } from 'react'
import { courseContext } from '../../contexts/CourseContext'

const ActionButtons = ({ url, id }) => {

    const {
        setShowConfirmDelete,
        setShowUpdateCourseModal,
        // courseState: {
        //     courses,
        //     updateCourse,
        // },
        findCourse,
    } = useContext(courseContext);

    const btnUpdateCourse = () => {
       findCourse(id);
        
        setShowUpdateCourseModal(true);
    }

    return (
        <>
            <Button className='course-button' href={url} target='_blank' >
                <img src={playIcon} alt="play" />
            </Button>
            <Button className='mx-2 course-button' onClick={() => btnUpdateCourse()}>
                <img src={editIcon} alt="edit"/>
            </Button>
            <Button className='course-button' onClick={() => setShowConfirmDelete({show: true, courseId: id})}>
                <img src={deleteIcon} alt="delete"/>
            </Button>
        </>
    )
}

export default ActionButtons;