import { extractError } from '@reyaxyz/ui-minions';

const extractDetailsError = (str: string): string => {
  const match = str.match(/Details: (.+?)\n/);
  const matched = match ? match[1] || '' : '';

  if (matched.indexOf('User rejected the request') !== -1) {
    return 'Network switch was canceled by User.';
  }
  return matched;
};

export const parseWagmiError = (err: unknown): string => {
  return extractDetailsError(extractError(err));
};
