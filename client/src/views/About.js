import {
    Row,
    Col,
    Button
} from 'react-bootstrap'

const About = () => {
    return (
        <>
            <Row>
                <Col className='text-center mt-2'>
                    <Button variant='primary' href='https://youtube.com' size='lg' >
                        Direct to youtube
                    </Button>
                </Col>
            </Row>  
        </>
    )
}   

export default About;