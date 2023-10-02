import { useContext, useState } from 'react';
import {
    Form,
    Button
} from 'react-bootstrap'
import { courseContext } from '../../contexts/CourseContext';

const SortCoursesMenu =  () => {

    const {
        sortField,
        setSortField,
        sortType,
        setSortType,
        sortCourses,
    } = useContext(courseContext);

    // use State
    const [checkedSortField, setCheckedSortField] = useState({
        sortField: ''
    });

    const [checkedSorttype, setCheckedSortType] = useState({
        sortType: 'asc',
    })

    // const {
    //     sortField
    // } = checkedSortField

    // on click sorrtfield
    const onChangeSortField = (event) => {
        setCheckedSortField({
            sortField: event.target.name
        });
        // console.log(event.target.name+ 'field');
        setSortField(event.target.name)
    }

    const onChangeSortType = (event) => {
        setCheckedSortType({
            sortType: event.target.name
        });
        // console.log(event.target.name + 'type');
        setSortType(event.target.name);
    }

    return (
        <>
            <div 
                style={{
                    width: '25%',
                    border: '1px solid #ccc',
                    height: '100vh',
                    paddingLeft: '12px'
                }}
            >
                <p className="text-center"><strong>Sắp xếp</strong></p>
                <div>
                    <p>Sắp xếp theo:</p>
                    <Form>
                        <Form.Check 
                            type='checkbox'
                            label='title'
                            name='title'
                            checked={checkedSortField.sortField === 'title' ? true : false}
                            onChange={onChangeSortField}
                        />
                        <Form.Check 
                            type='checkbox'
                            label='status'
                            name='status'
                            checked={checkedSortField.sortField === 'status' ? true : false}
                            onChange={onChangeSortField}
                        />
                    </Form>

                    <hr></hr>
                    <p>Type sort</p>
                    <Form>
                        <Form.Check 
                            type='checkbox'
                            label='asc'
                            name='asc'
                            checked={checkedSorttype.sortType === 'asc' ? true : false}
                            onChange={onChangeSortType}
                        />
                        <Form.Check 
                            type='checkbox'
                            label='desc'
                            name='desc'
                            checked={checkedSorttype.sortType === 'desc' ? true : false}
                            onChange={onChangeSortType}
                        />
                    </Form>
                    <div className="d-grid pt-2">
                        <Button size='lg' className=""
                            onClick={() => sortCourses(sortField, sortType)}
                            style={{
                                marginRight: '20px'
                            }}
                        >Sort</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SortCoursesMenu;