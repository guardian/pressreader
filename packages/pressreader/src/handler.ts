import { editionConfig } from './config';
import { getCapiToken, putDataToS3 } from './util';

const fakeData = [
	{
		section: 'Headlines',
		articles: [
			'us-news/2017/oct/16/mitch-mcconnell-donald-trump-lunch-steve-bannon-war',
			'world/2017/oct/17/murdered-panama-papers-journalist-son-malta-crooks-daphne-caruana-galizia',
			'world/2017/oct/17/iraqi-forces-drive-kurdish-fighters-out-of-sinjar',
			'world/2017/oct/17/un-report-on-rohingya-hunger-is-shelved-at-myanmars-request',
			'us-news/2017/oct/17/florida-governor-state-of-emergency-richard-spencer-white-nationalist-speech',
			'us-news/2017/oct/16/california-wildfire-death-toll-recovery',
			'world/2017/oct/17/north-korean-un-envoy-says-nuclear-war-may-break-out-at-any-moment',
			'world/2017/oct/17/anger-as-chinese-media-claim-harassment-is-just-a-western-problem',
		],
	},
];

export const main = async () => {
	console.log('Lambda handler called, processing request');

	// TODO: Remove this log when consumed
	const capiToken = await getCapiToken();
	console.log(`Got capiToken (length): ${capiToken.length}`);

	// TODO: Remove this log when consumed
	console.log(`Got editionConfig: ${JSON.stringify(editionConfig)}`);

	const dataToStore = JSON.stringify(fakeData);
	const currentDate = new Date();

	const writtenToLocation = await putDataToS3(dataToStore, currentDate);

	console.log(`Written data to: ${writtenToLocation}`);
};

if (require.main === module) {
	void (async () => await main())();
}
