export declare const standardQueries: {
    'query.in_range': (value: number, min: number, max: number) => boolean;
    'query.all': (mustMatch: unknown, ...values: unknown[]) => boolean;
    'query.any': (mustMatch: unknown, ...values: unknown[]) => boolean;
};
