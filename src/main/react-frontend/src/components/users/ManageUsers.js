import React from "react";

export default function ManageUsers(props) {
	return (
		<tbody>
			{props.users.map((i) => {
				return (
					<>
						<tr>
                            <td>{i.userId }</td>
                            <td>{i.email }</td>
                            <td>{i.firstName }</td>
                            <td>{i.lastName }</td>
                            <td>{i.address }</td>
                            <td>{i.postalCode }</td>
                            <td>{i.phoneNumber }</td>
                        </tr>
					</>
				);
			})}
		</tbody>
	);
}
