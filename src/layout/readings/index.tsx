'use client';

import { useCallback, useState, JSX } from 'react';
import Image from 'next/image';
import { BookOpenIcon, ClockIcon, CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react';

import { Container, Content } from '@/components/Container';
import Tabs from '@/components/Tabs';

import { books } from '@/utils/content/books';
import { STATUS_LABELS, TABS_READING } from '@/utils/const/books';
import { STATUS_BOOK } from '@/utils/enums';
import { PillStyle } from '@/utils/types/component';
import { Book } from '@/utils/types/books';

import * as S from './styles';

export default function Readings(): JSX.Element {
  const [tab, setTab] = useState<STATUS_BOOK>(STATUS_BOOK.ALL);
  const [pillStyle, setPillStyle] = useState<PillStyle>({ left: 0, width: 0, opacity: 0 });

  const activeTabRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      setPillStyle({ 
        left: node.offsetLeft, 
        width: node.offsetWidth, 
        opacity: 1 
      });
    }
  }, [tab]); 

  const booksData = books as Book[];

  const filteredBooks = booksData.filter((book) => {
    if (tab === STATUS_BOOK.ALL) return true;
    return book.status === tab;
  });

  return (
    <Container size='lg'>
      <Content>
        <Tabs pillStyle={pillStyle} activeTab={tab} activeTabRef={activeTabRef} setActiveTab={setTab} dados={TABS_READING} />
        
        {filteredBooks.length > 0 ? (
          <S.ListContainer>
            {filteredBooks.map((book) => (
              <S.BookRow key={book.id} href={book.link} target="_blank">
                <S.MainInfo>
                  <S.BookCover>
                    <Image 
                      src={book.cover} 
                      alt={book.title} 
                      fill 
                      sizes="80px" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </S.BookCover>
                  <S.BookDetails>
                    <strong>{book.title}</strong>
                    {book.subtitle && <span className="subtitle">{book.subtitle}</span>}
                    <span className="author">{book.author}</span>
                  </S.BookDetails>
                </S.MainInfo>
                
                <S.MetaInfo>
                  <S.StatusTag $status={book.status}>
                    {book.status === STATUS_BOOK.READ && <CheckCircleIcon weight="fill" />}
                    {book.status === STATUS_BOOK.READING && <BookOpenIcon weight="fill" />}
                    {book.status === STATUS_BOOK.TO_READ && <ClockIcon weight="fill" />}
                    
                    <span>{STATUS_LABELS[book.status] || book.status}</span>
                  </S.StatusTag>
                  
                  {book.readIn && <span className="date">Lido em: {book.readIn}</span>}
                </S.MetaInfo>
              </S.BookRow>
            ))}
          </S.ListContainer>
        ) : (
          <S.Empty>
            <WarningCircleIcon size={48} />
            <p>Nenhum livro encontrado nesta categoria.</p>
          </S.Empty>
        )}
      </Content>
    </Container>
  );
}