import raw from './portfolioData.json';
import rawMap from './mapData.json';
import type { PortfolioData, MapData } from '../types/portfolio';

// The JSON files are the editable source of truth; these casts attach the
// contract in `types/portfolio.ts` so components get real types from them.
// TypeScript widens JSON literals (e.g. `coordinates` to `number[]`, the icon
// strings to `string`), which is why a cast is needed rather than annotation.
export const portfolioData = raw as unknown as PortfolioData;

export const mapData = rawMap as unknown as MapData;
