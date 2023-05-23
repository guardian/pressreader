export const main = async () => {
	// Do stuff
	console.log('hello');

	await Promise.resolve(true);
};

if (require.main === module) {
	void (async () => await main())();
}
