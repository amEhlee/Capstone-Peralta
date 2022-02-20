// Import Dependencies
import React, { useRef, useState, useEffect } from "react";

// Import Components TODO revise imports and commented code
import { Form, FormGroup, InputGroup, Button, FormControl } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Creatable, {useCreatable} from "react-select/creatable";
import CreatableSelect from 'react-select/creatable';

import axios from "axios";



export default function SelectCategory() {
    //grabs categories
    var [categoryjson, setcategoryjson] = useState([]);
    const FETCH_URL = "http://localhost:8080/category/all";
    var CategoryList = [...categoryjson.map((i) => (
        {value: i.category_id, label: i.categoryName}))];
    // const categoryOptions = [...CategoryList];





    //stores all the categories in the categoryjson array
    function getCategories() {
        return axios
            .get(FETCH_URL) // preform get request
            .then((res) => {
                return res.data; // return response
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        getCategories().then((data) => {
            console.log("categories" + data); // log returned data

            setcategoryjson(data || "no data returned"); // store returned data in a variable

            CategoryList = [...categoryjson.map((i) => (
                {value: i.category_id, label: i.categoryName}))];
          
         
        });
    }, []);



function PopulateList(){
    var CategoryList = [...categoryjson.map((i) => (
        {value: i.category_id, label: i.categoryName}))];

}

useEffect(() => {PopulateList()}, []);

    

    
    //stores all the categories in the categoryjson array
    // function getCategories() {
    //     return axios
    //         .get(FETCH_URL) // preform get request
    //         .then((res) => {
    //             return res.data; // return response
    //         })
    //         .catch((err) => console.error(err));
    // }

    // useEffect(() => {
    //     getCategories().then((data) => {
    //         console.log("categories" + data); // log returned data

    //         setcategoryjson(data || "no data returned"); // store returned data in a variable

    //         CategoryList = [...categoryjson.map((i) => (
    //             {value: i.category_id, label: i.categoryName}))];
          
         
    //     });
    // }, []);


    //creates a copy of categoryjson array inside CategoryList setting value to the category_id and label to the categoryName
   
  

    // var [CategoryList , setCategoryList] = useState([]);
    // useEffect(() => {setCategoryList = categoryjson.map((i) => (
    //     {value: i.category_id, label: i.categoryName} || {value: 1, label: "test"}));},[]);


        // var CategoryList = categoryjson.map((i) => (
        //     {value: i.category_id, label: i.categoryName}));
    
      
    var [CategorySelection, getCat]=useState();
    var CatSelectHandle = (e) => {
        getCat(Array.isArray(e)?e.map(x=>x.categoryName):[]);
    }

    return (


        //non creatable version

        // <Select
        // options={CategoryList}
        // placeholder="Select Categories"
        // isSearchable
        // isClearable
        // // isMulti
        // // onChange={CatSelectHandle}
        // />


        //creatable version


        <CreatableSelect
        options={CategoryList}
    
        placeholder="Select Categories"
        isSearchable
        isClearable

        onChange={PopulateList}
        />

        

    );

}