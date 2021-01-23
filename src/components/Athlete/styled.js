import styled from 'styled-components'
import summit from '../../assets/summit.svg'

export const Container = styled.section`
	display: flex;
	align-items: center;
	padding: 10px 0px 0 10px;
	h1 {
		font-size: 30px;
		font-weight: bold;
	}
	ul {
		flex: 1;
		display: flex;
		list-style: none;
		margin-top: 10px;
		li {
			
			& + li {
				margin-left: 20px;
			}
			strong {
				display: block;
				font-size: 18px;
				color: var(--dark);
			}
			span {
				display: block;
				margin-top: 4px;
				color: var(--dark);
				font-size: 16px;
			}
		}
	}
	div {
		margin-left: 20px;
		.title {
			margin: 0;
			position: relative;
			color: var(--dark);
		}
	}
	
`
export const Avatar = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 50%;
`
export const Summit = styled.i`
	position: absolute;
	left: 50%;
	top: 6px;
	height: 24px;
	width: 24px;
	background-image: url(${summit});
`
export const Menu = styled.span`
	cursor: pointer;
	height: 2rem;
	width: 2rem;
	color: var(--dark);

`