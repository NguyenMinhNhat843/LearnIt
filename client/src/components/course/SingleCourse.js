import { 
    Card,
    Row,
    Col,
    Badge 
} from "react-bootstrap"
import ActionButtons from "./ActionButtons"

const SingleCourse = ({ course }) => {
    const {
        _id,
        title,
        description,
        url,
        status,
    } = course

    return (
        <>
            <Card border={
                status === 'LEARNED'
                ? 'success'
                : status === 'LEARNING'
                ? 'warning'
                : 'danger'
            }>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                <p className="">{title}</p>
                                <Badge pill
                                    className={status === 'LEARNED'
                                                ? 'bg-success'
                                                : status === 'LEARNING'
                                                ? 'bg-warning'
                                                : 'bg-danger'}  
                                >
                                    {status}
                                </Badge>
                            </Col>
                            <Col className='d-flex justify-content-end align-items-start'>
                                <ActionButtons url={url} id={_id} />
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleCourse;