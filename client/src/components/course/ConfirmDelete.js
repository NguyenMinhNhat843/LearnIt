import { useContext } from "react";
import { Button, Modal } from "react-bootstrap"
import { courseContext } from "../../contexts/CourseContext";


const ConfirmDelete = () => {
    const {
        deleteCourse,
        showConfirmDelete: {
            show,
            courseId,
        },
        setShowConfirmDelete
    } = useContext(courseContext)

    const deleteCourse_yes = () => {
        deleteCourse(courseId);
        setShowConfirmDelete({
            show: false,
            courseId: null
        })
    }

    return (
        <Modal show={show} >
            <Modal.Header>
                Warning
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete?
                </p>

                <div className="d-flex justify-content-end">
                    <Button className="mx-3 px-3" onClick={() => deleteCourse_yes()}>
                        Yes
                    </Button>
                    <Button variant='danger' className="px-3" onClick={() => setShowConfirmDelete({show: false, courseId: null})}>
                        No
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmDelete;