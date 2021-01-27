import styled from 'styled-components'
import { Link } from "gatsby"

export const ActivitieWrapper = styled.div`
    margin: 20px auto;
    width: 60vw;
    ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: white;
        padding: 10px;
        margin-top: 10px;
        border-radius: 5px;
        li {
            background-color: white;
            
            font-size: 1rem;
            line-height: 1.3rem;
            strong {
                font-weight: bold;
                display: block;
            }
        }
    }
    div {
        h1 {
            font-weight: bold;
            color: var(--dark);
            font-size: 1.5rem;
            line-height: 2rem;
        }
        span {
            font-size: .8rem;
        }
    }
`
export const ActivitieButton = styled(Link)`
    text-decoration: none;
    align-self: center;
    color: #FA5002;
    border: 1px solid #FA5002;
    padding: 10px 20px;
    border-radius: 5px;
`