type ModelType = Document | Document[] | PaginationModel<any>

namespace Express {
    export interface Request {
        $get: (key: string | string[], defaultValue?: any) => any
        user: User
        pagination: () => {
            limit: number
            page: number
            sort: {
                [key: string]: 'asc' | 'desc' | 'ascending' | 'descending'
            }
        }
    }

    export interface Response {
        toJSON: (model: ModelType, extra?: {}) => Response
    }
}