export const supportedLocales = ['hu', 'gb', 'us'];

export type LocaleConfig = {
    [K in (typeof supportedLocales)[number]]: {
        displayName: string;
        flagKey: string;
    };
};

export const localeConfigs: LocaleConfig = {
    hu: {
        displayName: 'Magyar',
        flagKey: 'hu',
    },
    gb: {
        displayName: 'English - UK',
        flagKey: 'gb',
    },
    us: {
        displayName: 'English - US',
        flagKey: 'us',
    },
};
