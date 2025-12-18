'use client';

import { useEffect, useState, JSX, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { CommandIcon, XIcon } from '@phosphor-icons/react';

import { menuLinks } from '@/utils/content/start';
import { social } from '@/utils/content/about';
import { blurDataURL } from '@/utils/functions/imageShimmer';
import { SocialItem } from '@/utils/types/component';
import { backdropVariants, drawerVariants, itemVariants } from '@/utils/const/component';

import * as S from './styles';

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,    
    () => false    
  );
}

export default function Navigation(): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const isMounted = useMounted();
  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const portalContainer = isMounted && typeof document !== 'undefined' ? document.body : null;
  return (
    <>
      <S.MenuButton onClick={toggleMenu} aria-label="Abrir Menu">
        <CommandIcon size={22} weight="bold" />
      </S.MenuButton>
      {portalContainer && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <S.Backdrop key="backdrop" initial="closed" animate="open" exit="closed" variants={backdropVariants} onClick={toggleMenu} />
              <S.DrawerContainer key="drawer" initial="closed" animate="open" exit="closed" variants={drawerVariants}>
                <S.HeaderDrawer>
                  <S.LogoLink>
                    <Image src="/img/twobanks.webp" alt="Personagem BERA" width={40} height={40} priority style={{ width: '100%', height: 'auto' }} placeholder="blur" blurDataURL={blurDataURL} />
                  </S.LogoLink>
                  <S.CloseButton onClick={toggleMenu}>
                    <XIcon size={22} />
                  </S.CloseButton>
                </S.HeaderDrawer>
                <S.DrawerContent>
                  <S.NavList onMouseLeave={() => setHoveredPath(null)}>
                    {menuLinks.map((item, index) => (
                      <S.NavItem key={item.link} variants={itemVariants} onMouseEnter={() => setHoveredPath(item.link)}>
                        {hoveredPath === item.link && (
                          <S.HoverHighlight layoutId="nav-highlight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                        )}
                        <S.MenuLink onClick={toggleMenu} href={item.link} $isActive={pathname === item.link}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <strong>{item.name}</strong>
                        </S.MenuLink>
                      </S.NavItem>
                    ))}
                  </S.NavList>
                  <S.SocialWrapper>
                    {social.map((item: SocialItem, index: number) => {
                      const IconComponent = item.icon;
                      return (
                        <Link key={index} href={item.link} target="_blank" title={item.name}>
                          <IconComponent size={24} weight="regular" />
                        </Link>
                      );
                    })}
                  </S.SocialWrapper>
                </S.DrawerContent>
              </S.DrawerContainer>
            </>
          )}
        </AnimatePresence>,
        portalContainer
      )}
    </>
  );
}