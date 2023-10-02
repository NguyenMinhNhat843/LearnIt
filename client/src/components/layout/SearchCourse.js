import { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap"
import { courseContext } from "../../contexts/CourseContext";



const SearchCourse = () => {
    // context
    const {
        searchCourse,
    } = useContext(courseContext)

    // state
    const [inputSearch, setInputSearch] = useState({
        key: ''
    });

    const onChangeInputSearch = (event) => {
        // console.log(event.target.value);
        setInputSearch({
            key: event.target.value,
        });
    }

    const handleSubmitFormSearch = async (event) => {
        event.preventDefault();

        try {
            await searchCourse(inputSearch)
        } catch (error) {
            console.log(error);            
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmitFormSearch}>
                <InputGroup>
                    <Form.Control 
                        placeholder="search anthing..."
                        name='search'
                        value={inputSearch.key}
                        onChange={onChangeInputSearch}
                        style={{
                            width: '500px'
                        }}
                    />
                    <InputGroup.Text>
                        <Button type="submit">
                            Search
                        </Button>
                    </InputGroup.Text>
                </InputGroup>
            </Form>
        </>
    )   
}

export default SearchCourse;