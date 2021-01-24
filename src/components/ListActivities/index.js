import React from "react"
import { Link } from "gatsby"
import { secondsToHms } from "../../utils/convert"

import { Title } from './styled'

const ListActivities = ({ id, name, average_speed, distance, kudos_count, moving_time, start_date_formatted, suffer_score, total_elevation_gain, type }) => {
    const linkActivitie = 'https://www.strava.com/activities/';
    const timeObject = secondsToHms(moving_time)
    return (
        <>
            <li>
                <Title>{name}</Title>
                <ul>
                    <li>{start_date_formatted}</li>
                    <li>
                        {type === 'Ride' ? 'V. Média: ' : 'Pace: '}
                        {average_speed}
                    </li>
                    <li>Distancia: {((distance) / 1000).toFixed(1)} km</li>
                    <li>Kudos: {kudos_count}</li>
                    <li>
                        Tempo de movimentação:
                        {timeObject.h > 0 && (
                            <span>{timeObject.h}h</span>
                        )}

                        {" " + timeObject.m > 0 && (
                            <span>{timeObject.m}min</span>
                        )}
                        {" " + timeObject.s}s
                    </li>
                    <li>Ganho Elevação: {total_elevation_gain} m</li>
                    <li>Tipo: {type}</li>
                    <li>Esforço relativo: {suffer_score}</li>
                    <Link to={`${linkActivitie}${id}`} target="_blank">view activitie</Link>
                </ul>
            </li>
        </>
    )
}


export default ListActivities