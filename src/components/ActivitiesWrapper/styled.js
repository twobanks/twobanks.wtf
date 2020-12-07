import styled from "styled-components"

export const ActivitiesWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    li {
        width: 250px;
        margin: 20px 0;
        a {
            color: black;
            font-size: 1.2rem;
            font-weight: bold;
            text-decoration: none;
        }
        ul {
            li {
                margin: 0;
            }
        }
    }
`