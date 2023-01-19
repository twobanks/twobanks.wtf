import { Post } from "../../../types/banks";
import * as S from '../styled';

const PostBody = ({ post }: { post: Post }) => {
  return (
    <S.Content>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </S.Content>
  )
}

export default PostBody;
