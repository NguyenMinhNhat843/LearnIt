import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { courseContext } from "../../contexts/CourseContext";


const ModalAddCourse = () => {
    // use context
    const {
        showModalAddCourse,
        setShowModalAddCourse,
        addCourse,
        setShowToast,
    } = useContext(courseContext)

    // use State
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const {
        title,
        description,
        url,
    } = newCourse

    const onChangeNewCourse = event => {
        setNewCourse({
            ...newCourse,
            [event.target.name]: event.target.value,
        })
    }

    const resetFormAddCourse = () => {
        setNewCourse({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowModalAddCourse(false);
    }

    const closeDialog = () => {
        resetFormAddCourse();
    }

    // submit form
    const modalAddCourseSubmit = async (event) => {
        event.preventDefault();

        const course_added = await addCourse(newCourse);

        setShowToast({
            show: true,
            message: course_added.status === 201 ? 'add a course successfully!!!' : 'an error occuping!!',
            type: course_added.status === 201 ? 'success' : 'danger',
        })
        resetFormAddCourse();
    }

    return (
        <>
            <Modal show={showModalAddCourse} onHide={closeDialog}>
                <Modal.Header closeButton>
                    What do you want to learn?
                </Modal.Header>
                <Form onSubmit={modalAddCourseSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder="Title"
                                name='title'
                                required
                                value={title}
                                onChange={onChangeNewCourse}
                            />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Control
                                as='textarea'
                                row={3}
                                placeholder="Description"
                                name='description'
                                value={description}
                                onChange={onChangeNewCourse}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder="Youtube tutorial url"
                                name='url'
                                value={url}
                                onChange={onChangeNewCourse}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' type='submit' >
                            LearnIt
                        </Button>
                        <Button 
                            variant='danger' 
                            onClick={closeDialog} 
                        >
                            Cancle
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAddCourse;