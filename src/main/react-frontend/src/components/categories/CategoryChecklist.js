// Import Dependencies
import React, {useRef, useState, useEffect} from "react";
import axios from "axios";

// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl} from "react-bootstrap";

export default function CategoryChecklist(){

    //store the categories selected in an array
    const [checkedCategories, setCheckedCategories] = useState([]);


    
    <FormGroup className="mb-3" controlId="formItemCategory">
    {/* checkbox */}

    <Form.Label>Item Category</Form.Label>

    {categoryjson.map((i) => (
        <Form.Check type="checkbox" name="category" value={i.category_id} label={i.categoryName}
                    // checked={checkedState[index]} onChange={handleOnChange(index)}  <- attempted to put items in array
        />
    ))}


    {/*the following will allow you to create a checkbox with custom text....*/}
    {/*<InputGroup className="mb-3">*/}
    {/*    <InputGroup.Checkbox aria-label="Checkbox for following text input" />*/}
    {/*    <FormControl aria-label="Text input with checkbox" />*/}
    {/*</InputGroup>*/}
</FormGroup>

}