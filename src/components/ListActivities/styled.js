import styled from 'styled-components'
import { Link } from "gatsby"

export const Activities = styled.section`
    ol {
        display: flex;
        flex-wrap: wrap;
        li {
            list-style: none;
            width: 300px;
            margin: 20px;
        }
    }
`
export const Title = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    color: black;
    font-size: 1.5rem;
`