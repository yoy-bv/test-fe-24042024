import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSSTransition } from 'react-transition-group';

import { MenuSideBarType } from '@/base/types/side-bar';
import styles from './sidebar.module.scss';

type SidebarLayoutProps = {
  isOpen: boolean;
  menuSidebar: MenuSideBarType[];
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ isOpen, menuSidebar }) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        'position-fixed h-100 w-100 pt-60px',
        styles.sidebarWrapper,
        { 'max-w-130px': isOpen },
        { 'max-w-44px': !isOpen },
      )}
    >
      <ul className={cn('d-flex flex-column align-items-center gap-20px m-0 p-0 h-100 w-100 list-style-type-none')}>
        {menuSidebar &&
          menuSidebar.map((item, index) => (
            <li key={`${index}-${item.href}`} className={cn('w-100 d-flex flex-column align-items-center gap-8px')}>
              <Link
                href={item.href}
                className={cn('w-100 d-flex flex-column align-items-center p-10px', styles.sidebarOption, {
                  'sidebar-option-active': router.route.includes(item.href),
                  'sidebar-option-default': !router.route.includes(item.href),
                })}
                role="button"
              >
                <span className={cn(`${item.icon} text-24px icon-option`)} />
                <CSSTransition in={isOpen} timeout={200} unmountOnExit>
                  {(state) => (
                    <span
                      className={cn(
                        'w-100 text-truncate font-weight-normal text-16px text-center show',
                        `fade fade-${state}`,
                      )}
                    >
                      {item.name}
                    </span>
                  )}
                </CSSTransition>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SidebarLayout;
