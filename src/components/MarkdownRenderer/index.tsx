'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { MarkdownRendererProps } from '@/utils/types/component';

import * as S from './styles';

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        p: ({ node, ...props }) => <S.StyledParagraph {...props} />,
        strong: ({ node, ...props }) => <S.StyledStrong {...props} />,
        span: ({ node, ...props }) => <S.StyledSpan {...props} />,
        a: ({ node, href, children, ...props }) => {
          const isExternal = href?.startsWith('http');
          return (
            <S.StyledLink href={href || '#'} target={isExternal ? '_blank' : undefined}rel={isExternal ? "noopener noreferrer" : undefined}{...props}>
              {children}
            </S.StyledLink>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}