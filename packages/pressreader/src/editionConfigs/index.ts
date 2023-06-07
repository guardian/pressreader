import type { EditionKey } from 'packages/shared-types';
import type { PressReaderEditionConfig } from '../types/PressReaderTypes';
import { ausConfig } from './ausConfig';
import { usConfig } from './usConfig';

export const editionConfigs: Record<EditionKey, PressReaderEditionConfig> = {
	AUS: ausConfig,
	US: usConfig,
};
