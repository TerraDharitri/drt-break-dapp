import { formatAmount } from '@terradharitri/sdk-dapp/utils';

export const getFormattedBalance = (balance: string) =>
  formatAmount({
    input: !balance?.includes('...') ? balance ?? '0' : '0',
    decimals: 18,
  });
