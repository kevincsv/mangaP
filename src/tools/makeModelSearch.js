const algoliasearch = require('algoliasearch');
const mongooseAlgolia = require('mongoose-algolia');

const env = require('dotenv').config();

console.log(env);

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN);

module.exports = (Schema, {indexName} = {}) => {
	const index = client.initIndex(indexName);

	Schema.plugin(mongooseAlgolia, {
		appId: process.env.ALGOLIA_APP_ID,
		apiKey: process.env.ALGOLIA_ADMIN,
		indexName,
		debug: process.env.DEBUG_ALGOLIA === 'true' || process.env.DEBUG_GLOBAL === 'true'
	});

	Schema.statics.search = async function (search, {
		attributesToRetrieve = [
			'objectID'
		],
		attributesToHighlight = [
			0
		]
	} = {}) {
		let filter = {};

		if (search) {
			const result = await index.search(search, {
				attributesToRetrieve,
				attributesToHighlight
			}, '').then(({hits}) => hits.map(({objectID}) => objectID));

			filter = {_id: {$in: result}};
		}

		return {filter, query: this};
	};
};