import { useContext, useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap"
import { courseContext } from "../../contexts/CourseContext";



const UpdateCourseModal = () => {
    // conetxt
    const {
        showUpdateCourseModal,
        setShowUpdateCourseModal,
        courseState: {
            updateCourseContext,
        },
        updateCourse,
        setShowToast,
    } = useContext(courseContext)

    // use State
    const [updatedCourse, setUpdateCourse] = useState(updateCourseContext);

    // useEffect
    useEffect(() => {
        setUpdateCourse(updateCourseContext)
    }, [updateCourseContext])

    // get field
    const {
        title, description, url, status
    } = updatedCourse

    const onChangeUpdateInput = (event) =>{
        setUpdateCourse({
            ...updatedCourse,
            [event.target.name]: event.target.value,
        })
    }

    // reset modal
    const closeModal = () => {
        setShowUpdateCourseModal(false);
        setUpdateCourse({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
    }

    // submit form
    const updateModalSubmit = async (event) => {
        event.preventDefault();

        const data = await updateCourse(updatedCourse);
        setShowUpdateCourseModal(false);

        setShowToast({
            show: true,
            message: data.status === 200 ? 'updated successfully' : 'somthing error!!!' ,
            type: data.status === 200 ? 'success': 'danger',
        })
    }

    return (
        <Modal
            show={showUpdateCourseModal}
            onHide={closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-primary">
                    Update Course 
                </Modal.Title>
            </Modal.Header>
            <Form 
                onSubmit={updateModalSubmit}
            >
                <Modal.Body>
                    <Form.Group>
                        <Form.Control 
                            type='text'
                            placeholder="title"
                            name='title'
                            value={title}
                            onChange={onChangeUpdateInput}
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control 
                            as='textarea'
                            rows='3'
                            placeholder="description"
                            name='description'
                            value={description}
                            onChange={onChangeUpdateInput}
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control 
                            type='text'
                            placeholder="url"
                            name='url'
                            value={url}
                            onChange={onChangeUpdateInput}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select
                            name='status'
                            value={status}
                            onChange={onChangeUpdateInput}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit'>
                        Update
                    </Button>
                    <Button variant='danger'  
                        onClick={() => closeModal()}
                    >
                        Cancle
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateCourseModal;