import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Container, Col, Row, Carousel } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function ProductPage() {
	let { itemid } = useParams();
	const FETCH_URL = "http://localhost:8080/item/get/" + itemid;
	var [datajson, setDataJson] = useState([]); // used to store data TODO rename var

	// function that will be called when the page loads purpose is to handle and process the axios get request
	async function gatherData() {
		return await axios
			.get(FETCH_URL) // preform get request
			.then((res) => {
				return res.data; // return response
			})
			.catch((err) => console.error(err));
	}

	// runs the gatherdata function when the page loads
	useEffect(() => {
		gatherData().then((data) => {
			setDataJson(data || "no data returned"); // store returned data in a variable
		});
	}, []);

	console.log(datajson);

	//sets what is output to the webpage
	if (datajson === "no data returned") {
		return (
			<section>
				<p>{datajson}</p>
				<p>NO DATA FOUND</p>
			</section>
		);
	} else {
		return (
			<>
				<Link to="/">Home</Link>

				<Container>
					<Row className="justify-content-md-center">
						<Col md="auto">
							<img src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png" />
						</Col>

						<Col md="auto">
							<div>{datajson.itemName}</div>
							<div>item description placeholder</div>
							<div>${datajson.itemPrice}</div>
						</Col>
					</Row>
				</Container>

				<UserContext.Consumer>
					{(value) => {
						function AddToCart() {
							let newCart = value.contextData.cart;

							for (let i = 0; i < newCart.length; i++) {
								if (newCart[i].item.itemName === datajson.itemName) {
									newCart[i].quantity++;
									return newCart;
								}
							}

							newCart.push({item: datajson, quantity: 1});
							return newCart;
						}

						return (
							<button
								onClick={() => {
									// Do this:
									value.setContextData((prevData) => {
										return {
											...prevData,
											cart: AddToCart(),
										};
									});
								}}
							>
								Add To Cart
							</button>
						);
					}}
				</UserContext.Consumer>
			</>
		);
	}
}
