import {Document, Model, Schema, PaginateModel} from 'mongoose'
import algolia, {BrowseResponse} from 'algoliasearch'
// @ts-ignore
import mongooseAlgolia from 'mongoose-algolia';

const client = algolia(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_ADMIN}`);

export interface ISearchModel<T extends Document> extends Model<T> {
    SyncToAlgolia: () => Promise<void>
    SetAlgoliaSettings: (
        settings?: {
            [key: string]: any
        }
    ) => void
    search: (search: string, options?: {
        [key: string]: any
    }) => Promise<{ query: { _id: { $in: string[] } }, model: PaginateModel<T> }>
}

export default function <T extends Document>(schema: Schema<T>, {indexName}: { indexName: string }) {
    const index = client.initIndex(indexName);

    schema.plugin(mongooseAlgolia, {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN,
        indexName,
        debug: process.env.DEBUG_ALGOLIA || process.env.DEBUG_GLOBAL
    });

    schema.statics.search = async function (search: string, {
        attributesToRetrieve = [
            'objectID'
        ],
        attributesToHighlight = [
            0
        ]
    } = {}) {
        let query = {};

        if (search) {
            const result = await index.search({
                query: search,
                attributesToRetrieve,
                attributesToHighlight
            }).then(({hits}: BrowseResponse) => hits.map(({objectID}: any) => objectID));

            query = {_id: {$in: result}};
        }

        return {query, model: this};
    };
};