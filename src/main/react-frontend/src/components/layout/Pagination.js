import React from "react";
import { Pagination} from "react-bootstrap";

export default function PaginationNav(props) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<Pagination>
				{pageNumbers.map((number) => {
                    if(props.currentPage === number ) {
                        return <Pagination.Item active key={number} onClick={() => props.paginate(number)}>{number}</Pagination.Item>;
                    } else {
                        return <Pagination.Item key={number} onClick={() => props.paginate(number)}>{number}</Pagination.Item>;
                    }

				})}
			</Pagination>
		</nav>
	);
}
