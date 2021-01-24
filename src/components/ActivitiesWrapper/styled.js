import styled from "styled-components"

export const ActivitiesWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px 20px;
    li {
        margin: 20px 0;
        a {
            color: var(--dark);
            font-size: 1.2rem;
            font-weight: bold;
            text-decoration: none;
        }
        ul {
            margin-top: 10px;
            li {
                margin: 5px 0;
                color: var(--dark);
            }
        }
    }
`