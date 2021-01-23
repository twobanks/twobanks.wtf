import React from "react"

import { Link } from "gatsby"

const ListActivities = ({ id, name, average_speed, distance, kudos_count, moving_time, start_date, total_elevation_gain, type }) => {
    const linkActivitie = 'https://www.strava.com/activities/';

    return (
        <>
            <li>
                <Link to={`/activities/${id}`}>{name}</Link>
                <ul>
                    <li>
                        {type === 'Ride' ? 'V. Média: ' : 'Pace: '}
                        {average_speed}
                    </li>
                    <li>Distancia: {((distance) / 1000).toFixed(1)} km</li>
                    <li>Kudos: {kudos_count}</li>
                    <li>Date: {start_date}</li>
                    <li>Moving Time: {moving_time}</li>
                    <li>Ganho Elevação: {total_elevation_gain} m</li>
                    <li>Tipo: {type}</li>
                    <Link to={`${linkActivitie}${id}`} target="_blank">view activitie</Link>
                </ul>
            </li>
        </>
    )
}


export default ListActivities