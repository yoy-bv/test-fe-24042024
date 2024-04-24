import Image from 'next/image';
import cn from 'classnames';

import { useTranslation } from '@/base/config/i18next';

import styles from './header.module.scss';

function HeaderLayout() {
  const { t } = useTranslation('header');

  return (
    <header
      className={cn(
        'px-24px py-10px header-bg-color position-fixed w-100 d-flex justify-content-between align-items-center min-h-60px top-0',
        styles.headerWrapper,
      )}
    >
      <div className={cn('d-flex align-items-center')}>
        <Image src="/images/pim/logo.png" width={40} height={40} alt="logo" priority className="mr-10px max-h-40px" />
        <Image src="/images/pim/logo-text.png" width={53} height={40} className="max-h-16px" alt="logo" />
      </div>
      <div className={cn('d-flex align-items-center gap-32px')}>
        {!!process.env.SHOW_LANGUAGE_SWITCH && (
          <div className="d-flex justify-content-between align-items-center gap-10px" role="button">
            <span className="iconimgs-world text-20px" />
            <span className="">{t('language')}</span>
            <span className="iconimgs-chevron-down-bold text-6px" />
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center gap-10px" role="button">
          <span className="iconimgs-help text-20px" />
          <span className="">{t('support')}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center gap-10px" role="button">
          <span className="iconimgs-user-circle text-20px" />
          <span className="">アカウント</span>
          <span className="iconimgs-chevron-down-bold text-6px" />
        </div>
      </div>
    </header>
  );
}

export default HeaderLayout;
