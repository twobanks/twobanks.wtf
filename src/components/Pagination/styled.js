import styled from "styled-components"

export const PaginationWrapper = styled.section`
	align-items: center;
	color: var(--dark);
	display: flex;
	padding: 1.5rem 3rem;
	justify-content: space-between;
	a {
		color: var(--dark);
		text-decoration: none;
		transition: color 0.5s;
		&:hover {
			color: var(--light);
		}
	}
`