const TOKEN_FORMAT_MAP: Record<string, string> = {
  deusd: 'deUSD',
  reth: 'rETH',
  rusd: 'rUSD',
  sdeusd: 'sdeUSD',
  steth: 'stETH',
  susde: 'sUSDe',
  'usdc.e': 'USDC.e',
  wbtc: 'wBTC',
  weth: 'wETH',
};

/**
 * Formats a token string into a standardized format.
 *
 * @param {string | undefined} token - The token string to be formatted.
 * @returns {string} The formatted token string.
 */
export const tokenFormatter = (token: string | undefined): string => {
  if (!token) {
    return '';
  }
  const entry = TOKEN_FORMAT_MAP[token.toLowerCase()];
  if (entry) {
    return entry;
  }
  return token.toUpperCase();
};
