import React from "react"

import { Link } from "gatsby"

const ListActivities = ({ id, name, average_speed, distance, kudos_count, moving_time, start_date, total_elevation_gain }) => (
    <>
        <li>
            <Link to={`/activities/${id}`}>{name}</Link>
            <ul>
                <li>V. Média: {average_speed}</li>
                <li>Distancia: {((distance) / 1000).toFixed(1)} km</li>
                <li>Kudos: {kudos_count}</li>
                <li>Date: {start_date}</li>
                <li>Moving Time: {moving_time}</li>
                <li>Ganho Elevação: {total_elevation_gain}</li>
            </ul>
        </li>
    </>
)


export default ListActivities