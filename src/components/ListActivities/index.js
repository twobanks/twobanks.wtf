import React from "react"
import { secondsToHms } from "../../utils/convert"

import { ActivitieWrapper, ActivitieButton } from './styled'

const ListActivities = ({ id, name, average_speed, distance, kudos_count, moving_time, start_date_formatted, suffer_score, total_elevation_gain, type }) => {
    const linkActivitie = 'https://www.strava.com/activities/';
    const timeObject = secondsToHms(moving_time)
    return (
        <>
            <ActivitieWrapper>
                <div>
                    <h1>{name}</h1>
                    <span>{start_date_formatted}</span>
                </div>
                <ul>
                    <li>
                        Distancia:
                        <strong>{((distance) / 1000).toFixed(1)} km</strong>
                    </li>
                    <li>
                        {type === 'Ride' ? 'V. Média: ' : 'Pace: '}
                        <strong>{average_speed}</strong>
                    </li>

                    <li>Kudos: {kudos_count}</li>
                    <li>
                        Tempo de movimentação:
                        <strong>{timeObject.h > 0 && (
                            <span>{timeObject.h}h</span>
                        )}

                            {" " + timeObject.m > 0 && (
                                <span>{timeObject.m}min</span>
                            )}
                            {" " + timeObject.s}s</strong>
                    </li>
                    <li>
                        Ganho Elevação:
                        <strong>{total_elevation_gain} m</strong>
                    </li>
                    <li>
                        Tipo:
                        <strong>{type}</strong>
                    </li>
                    <li>
                        Esforço relativo:
                        <strong>{suffer_score}</strong>
                    </li>
                    <ActivitieButton to={`${linkActivitie}${id}`} target="_blank">view activitie</ActivitieButton>
                </ul>
            </ActivitieWrapper>
        </>
    )
}


export default ListActivities