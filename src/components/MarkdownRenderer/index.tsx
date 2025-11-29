'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import * as S from './styles';

interface MarkdownRendererProps {
  content: string;
}

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
            <S.StyledLink 
              href={href || '#'} 
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              {...props}
            >
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