'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, Variants } from 'framer-motion';
import { CommandIcon, XIcon } from '@phosphor-icons/react';
import { menuLinks } from '@/utils/content/start';

import * as S from './styles';
import { social } from '@/utils/content/about';
import { usePathname } from 'next/navigation';
import { blurDataURL } from '@/utils/functions/imageShimmer';

const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const drawerVariants: Variants = {
  closed: { 
    x: '100%', 
    transition: { type: 'spring', stiffness: 400, damping: 40 }
  },
  open: { 
    x: 0, 
    transition: { 
      type: 'spring', stiffness: 400, damping: 40,
      staggerChildren: 0.1, 
      delayChildren: 0.2    
    } 
  },
};

const itemVariants: Variants = {
  closed: { x: 50, opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      <S.MenuButton onClick={toggleMenu} aria-label="Abrir Menu">
        <CommandIcon size={22} weight="bold" />
      </S.MenuButton>
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <S.Backdrop key="backdrop" initial="closed" animate="open" exit="closed" variants={backdropVariants} onClick={toggleMenu} />
              <S.DrawerContainer key="drawer" initial="closed" animate="open" exit="closed" variants={drawerVariants} >
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
                    {social.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <Link key={index} href={item.link} target="_blank" title={item.name}>
                          <IconComponent size={24} weight="regular" />
                        </Link>
                      )
                    })}
                  </S.SocialWrapper>
                </S.DrawerContent>
              </S.DrawerContainer>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}