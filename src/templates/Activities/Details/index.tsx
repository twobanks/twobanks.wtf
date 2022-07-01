import Wrapper from '../../Wrapper'

const ActivityTemplate = ({ activity } : any) => {
  return (
    <Wrapper>{activity?.name}</Wrapper>
  )
}

export default ActivityTemplate
