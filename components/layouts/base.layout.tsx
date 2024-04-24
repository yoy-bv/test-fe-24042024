import React, { useState } from 'react';
import cn from 'classnames';

import { MenuSideBarType } from '@/base/types/side-bar';

import HeaderLayout from './header.layout';
import SidebarLayout from './sidebar.layout';
import styles from './sidebar.module.scss';

type BaseLayoutProps = {
  children: JSX.Element;
  menuSidebar: MenuSideBarType[];
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, menuSidebar }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className={cn('text-white h-100 w-100 bg-white min-vh-100')}>
      <HeaderLayout />
      <div className="pt-60px h-100 w-100 d-flex position-relative">
        <div
          className={cn(
            'h-24px w-24px position-fixed z-50 top-75px d-flex justify-content-center align-items-center',
            styles.sidebarToggle,
            { 'left-118px': isOpen },
            { 'left-32px': !isOpen },
          )}
          role="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={['text-9px iconimgs-chevron-left', styles.rotateIcon, isOpen && styles.unRotateIcon].join(' ')}
          />
        </div>

        <SidebarLayout isOpen={isOpen} menuSidebar={menuSidebar} />

        <div
          className={cn(
            'shrink-content text-color-1',
            styles.childrenWrapper,
            { 'ml-130px': isOpen },
            { 'ml-44px': !isOpen },
          )}
          style={{ flex: '1' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
