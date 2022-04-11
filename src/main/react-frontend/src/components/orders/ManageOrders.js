import React from "react";

export default function ManageUsers(props) {
	// current user list to be used for paginate or searching
	let toSearchOn;

	// TODO will still search on empty strings if backspaced to pagination might want to be done on the backend :/
	// always search on full user list if not searching use paginate
	props.search === ""
		? (toSearchOn = props.paginateOrderList)
		: (toSearchOn = props.fullOrderList);

	return (
		<tbody>
			{toSearchOn
				.filter((val) => {
					if (props.search === "") {
						return val;
					} else if (
						val.email.toLowerCase().includes(props.search.toLowerCase())
					) {
						return val;
					}
				})
				.map((i) => {
					return (
						<tr key={i.orderId}>
							<td>{i.orderId}</td>
							<td>{i.email}</td>
							<td>{i.orderTotal}</td>
							<td>{i.orderDate}</td>
							<td>{i.orderStatus}</td>
						</tr>
					);
				})}
		</tbody>
	);
}
