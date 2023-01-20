import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import SyntaxHighlighter from 'react-syntax-highlighter'
import * as S from '../styled';
import { DataPost } from "../../../types/banks";

const PostBody = ({ data, mdxSource }: { data: DataPost, mdxSource: MDXRemoteSerializeResult }) => (
  <S.Content>
    <h2>{data.title}</h2>
    <MDXRemote {...mdxSource} components={{ SyntaxHighlighter }} />
  </S.Content>
)

export default PostBody;
