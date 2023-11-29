import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from '@nic-jennings/sql-datasource'
import { Candidate, CandidateInput } from '@/__generated__/graphql'

type CandidateAggregate = Candidate & { full_count: number }


export class CandidateDAO extends BatchedSQLDataSource {
  constructor(config: BatchedSQLDataSourceProps) {
    super(config)
  }
  candidate(id: string) {
    return this.db.query
      .select('*')
      .from('public.Candidates')
      .where('id', id)
      .first()
  }
  createCandidate(candidate: CandidateInput) {
    return this.db.query.insert(candidate).into('public.Candidates').returning('*')
  }
  candidates(limit: number = 10, offset: number = 0) {
    return this.db.query.select('*').from('public.Candidates').limit(limit).offset(offset)
  }

  /**
   * Retrieves aggregated data from the "Candidates" table.
   * Each row of the aggregated data contains the full count of rows in the "Candidates" table.
   * Which can be used to implement pagination. The downside of this approach is that if the full count is less then the limit,
   * then it will return 0; Which requires additional logic to handle.
   *
   * @param {number} [limit=0] - Limits the number of records returned by the query.
   * @param {number} [offset=10] - Specifies the number of records to skip before starting to return results.
   * @returns {QueryBuilder} - A query builder object for further chaining of query building operations.
   *
   * @example
   * const result = candidatesAggregate(5, 20).then((data) => {
   *   // Process the query result here
   * });
   *
   * @sql
   * SELECT *, count(*) OVER() AS full_count FROM public."Candidates" LIMIT {limit} OFFSET {offset}
   *
   * @throws {Error} Ensure that the database connection (`this.db`) is properly established before calling this method.
   */
  candidatesAggregate(limit: number = 10, offset: number = 0) : Promise<CandidateAggregate[]> {
    return this.db.query(
      'SELECT *, count(*) OVER() AS full_count FROM public."Candidates"'
    ).limit(limit).offset(offset)
  }
}
