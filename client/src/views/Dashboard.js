import { useContext, useEffect } from "react";
import { courseContext } from "../contexts/CourseContext";
import { AuthContext } from "../contexts/AuthContext";
import SingleCourse from "../components/course/SingleCourse";
import {
    Spinner,
    Row,
    Col,
    Card,
    Button,
    OverlayTrigger,
    Tooltip,
    Toast,
} from 'react-bootstrap'
import addIcon from '../assests/plus-circle-fill.svg'
import ModalAddCourse from "../components/course/Modal-AddCourse";
import ConfirmDelete from "../components/course/ConfirmDelete";
import UpdateCourseModal from "../components/course/UpdateCourseModal";
import SortCoursesMenu from "../components/course/SortCoursesMenu";

const DashBoard = () => {
    // context
    const {
        courseState: {
            courses,
            courseLoading,
        },
        getAllCourse,
        setShowModalAddCourse,
        showToast: {
            show,
            message,
            type
        },
        setShowToast,
    } = useContext(courseContext);

    const {
        authState: {
            user: {
                username,
            }
        }
    } = useContext(AuthContext);

    let body = null;

    useEffect(() => {
        getAllCourse()
    }, []);

    // test

    if(courseLoading) {
        body = (
            <div>
                <Spinner variant='info' animation='border' />
            </div>
        )
    } else if (courses.length === 0) {
        body = (
            <>
                <Card className="text-center">
                    <Card.Header>
                        Hi {username}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to learnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button variant='primary' onClick={() => setShowModalAddCourse(true)}>
                            LearnIt!
                        </Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        // console.log(Array.isArray(courses));
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 mx-0">
                    {courses.map((course) => {
                        return (
                            <Col key={course._id} className="my-2" >
                                <SingleCourse course={course} />
                            </Col>
                        )
                    })}
                </Row>

                {/* // Open add course Model button */}
                <div className="d-flex justify-content-end">
                    <OverlayTrigger placement="left" 
                        overlay={
                            <Tooltip>Add anew thing!!!</Tooltip>
                        }    
                    >
                        <Button 
                            onClick={() => setShowModalAddCourse(true)}
                        >
                            <img src={addIcon} alt="addCourse" />
                        </Button>
                    </OverlayTrigger>
                </div>
            </>
        )
    }

    return (
        <div className="d-flex justify-content-between">
            <SortCoursesMenu />
            <div
                style={{
                    width: '100%'
                }}
            >
                {body}
                {/* add course modal */}
                <ModalAddCourse />
                {/* confirm delete Modal */}       
                <ConfirmDelete />
                {/* update modal */}
                <UpdateCourseModal />
                <Toast
                    show={show}
                    style={{
                        position: 'fixed',
                        top: '80px',
                        right: '10px'
                    }}
                    className={`bg-${type} text-white`}
                    onClose={() => setShowToast({
                        show: false,
                        message: '',
                        type: null
                    })}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>
                        <strong>{message}</strong>
                    </Toast.Body>
                </Toast>      
            </div>
         </div>
    )
}

export default DashBoard;