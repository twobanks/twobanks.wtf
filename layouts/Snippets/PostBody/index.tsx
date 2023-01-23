import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { DataPost } from "@/types/banks";
import * as S from '../styled';

const PostBody = ({ data, mdxSource }: { data: DataPost, mdxSource: MDXRemoteSerializeResult }) => (
  <S.Content>
    <h2>{data.title}</h2>
    <MDXRemote {...mdxSource} components={{ SyntaxHighlighter }} />
  </S.Content>
)

export default PostBody;
