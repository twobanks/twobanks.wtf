import styled from "styled-components"

export const ActivitiesWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    li {
        width: 100%;
        margin: 20px 0;
        a {
            color: var(--dark);
            font-size: 1.2rem;
            font-weight: bold;
            text-decoration: none;
        }
        ul {
            margin-top: 10px;
            display: flex;
            li {
                margin: 5px 0;
                color: var(--dark);
            }
        }
    }
`