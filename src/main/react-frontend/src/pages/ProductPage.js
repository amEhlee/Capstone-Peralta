import React from "react";
import axios from "axios";
import {Image, Container, Col, Row,  Carousel} from "react-bootstrap";


const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url


function gatherProductData() {
    return axios
        .get(FETCH_URL) // preform get request
        .then((res) => {
            return res.data; // return response
        })
        .catch((err) => console.error(err));
}

function ControlledCarousel(){
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
  };

};

const ProductPage = props => {
    return(
        <Container>
        <Col md={5}>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-10-"
                        src={}
                        alt={}>
                    </img>
                </Carousel.Item>
            </Carousel>
        </Col>

        <Col md={7}>
        <p></p>
            <h2>Product Name Placeholder</h2>
            <p>item id placeholder</p>
        </Col>
        </Container>
    )

}

export default ProductPage


