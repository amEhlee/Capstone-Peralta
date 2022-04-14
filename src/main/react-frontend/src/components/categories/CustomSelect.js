// Import Dependencies
import React from 'react';

// Import Components
import Select from 'react-select';

function CustomSelect({style,label,options,onChange,defaultValue,isMulti}) {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Select
                style={style}
                options={options}
                onChange={onChange}
                defaultValue={defaultValue}
                isMulti={isMulti}
            />
        </Form.Group>
    );


}