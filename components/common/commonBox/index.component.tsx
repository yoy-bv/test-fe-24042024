import Image from 'next/image';
import cn from 'classnames';

import styles from './index.module.scss';

type CommonBoxProps = {
  title: string;
  children: JSX.Element;
};

function CommonBox({ title, children }: CommonBoxProps) {
  return (
    <div className={cn('overflow-x-hidden d-flex align-items-center justify-content-center', styles.wrapper)}>
      <div
        className={cn(
          'w-100 h-100 d-flex bg-white d-flex flex-column align-items-center overflow-auto max-w-492px m-20px py-50px gap-24px',
          styles.boxContainer,
        )}
      >
        <div className={cn('d-flex align-items-center px-50px')}>
          <Image
            className={cn('object-fit-cover', styles.marginRightLogo, styles.logo)}
            src={'images/common/logo.png'}
            width={40}
            height={40}
            alt="logo"
          ></Image>
          <Image
            className={cn('object-fit-cover', styles.logo)}
            src={'images/common/logo-text.png'}
            width={53.09}
            height={14.7}
            alt="logo"
          ></Image>
        </div>
        <div className={cn(styles.title, 'px-20px text-color-0 font-weight-bold text-center')}>{title}</div>
        <div className={cn(styles.childContent, 'w-100 px-50px')}>{children}</div>
      </div>
    </div>
  );
}

export default CommonBox;
