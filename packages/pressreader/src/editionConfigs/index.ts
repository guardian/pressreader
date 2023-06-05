import type { EditionKey } from 'packages/shared-types';
import type { PressReaderEditionConfig } from '../types/PressReaderTypes';
import { ausConfig } from './ausConfig';

export const editionConfigs: Record<EditionKey, PressReaderEditionConfig> = {
	AUS: ausConfig,
};
