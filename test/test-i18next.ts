import * as I18next from '@/config/i18next';

jest.mock('@/config/i18next', () => ({
  useTranslation: jest.fn(),
}));

const translationSpy = jest.fn((str) => str);

(jest.spyOn(I18next, 'useTranslation') as any).mockReturnValue({
  t: translationSpy,
  i18n: {
    changeLanguage: () => new Promise(() => ({})),
    exists: jest.fn(),
  },
});

export { translationSpy };
