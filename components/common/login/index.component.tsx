import Link from 'next/link';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import i18n, { useTranslation } from '@/base/config/i18next';
import { EnumTypeInput } from '@/base/types/common';
import { login } from '@/api/auth';
import { LoginResponse } from '@/base/types/auth';
import { ErrorResponse } from '@/base/types/api';
import { saveLoginUser } from '@/base/redux/reducers/auth.reducer';
import { CookiesStorage } from '@/base/libs/storage/cookie';
import { UNAUTHORIZED } from '@/base/constants/errorCode';

import CommonBox from '@/components/common/commonBox/index.component';
import InputText from '@/components/input/typing/InputText';
import styles from './index.module.scss';

type FormLogin = {
  email?: string;
  password?: string;
};

function LoginComponent() {
  const { t } = useTranslation(['auth', 'authError', 'error_common']);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('authError:emailInvalid') || '')
      .required(t('authError:emailRequired') || '')
      .trim(),
    password: yup
      .string()
      .required(t('authError:passwordRequired') || '')
      .min(6, t('authError:minCharacterPassword', { min: 6 }) || '')
      .max(16, t('authError:maxCharacterPassword', { max: 16 }) || '')
      .trim(),
    captcha: yup
      .string()
      .required(t('authError:reCaptchaRequired') || '')
      .trim(),
  });

  const { handleSubmit, setFocus, control } = useForm<FormLogin>({
    resolver: yupResolver(schema),
  });

  const onLogin = async (formLogin: FormLogin) => {
    try {
      const response = await login({
        email: formLogin.email || '',
        password: formLogin.password || '',
      });
      const { data }: LoginResponse = response.data;
      dispatch(
        saveLoginUser({
          email: formLogin.email || '',
          loginStep: 1,
          token: {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            tokenType: data.tokenType,
            expiresIn: data.expiresIn,
            expiresAt: data.expiresAt,
          },
        }),
      );

      CookiesStorage.setAccessToken(data.accessToken);
      CookiesStorage.setRefreshToken(data.refreshToken);
    } catch (error) {
      const errorsAxios = error as AxiosError<ErrorResponse>;
      const messageError = i18n.exists(`error_common:${errorsAxios?.response?.data.error.error_code}`)
        ? t(String(errorsAxios?.response?.data.error.error_code))
        : t('authError:loginFailed');
      toast.error(messageError);
      if (errorsAxios?.response?.data.error.code === UNAUTHORIZED) setFocus('email');
    }
  };

  return (
    <CommonBox title={t('auth:loginTitle')}>
      <Form onSubmit={handleSubmit(onLogin)} className={cn('d-flex flex-column w-100 gap-24px')}>
        <Form.Group controlId="email">
          <Form.Label className="required">{t('auth:email')}</Form.Label>
          <InputText
            control={control}
            name="email"
            typeInput={EnumTypeInput.EMAIL}
            placeholder={String(t('auth:enterEmail'))}
            data-testid="email_input"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="required">{t('auth:password')}</Form.Label>
          <InputText
            control={control}
            name="password"
            type="password"
            placeholder={String(t('auth:enterPassword'))}
            data-testid="password_input"
          />
          <div className={cn('text-14px underline text-end mt-12px', styles.forgotPassLink)}>
            <Link href="/forgot-password">{t('auth:forgotPassword')}</Link>
          </div>
        </Form.Group>
      </Form>
    </CommonBox>
  );
}

export default LoginComponent;
