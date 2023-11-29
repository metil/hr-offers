import { BaseContext } from '@apollo/server'
import { DataSource } from '@/backend/db/DataSource'

export namespace GraphQL {
    interface Context extends BaseContext {
        db: DataSource
        isAuthenticated: boolean
    }
}

