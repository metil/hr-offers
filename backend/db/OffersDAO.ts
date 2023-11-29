import { BatchedSQLDataSource, BatchedSQLDataSourceProps } from '@nic-jennings/sql-datasource'
import { Offer, OfferInput } from '@/__generated__/graphql'

export class OffersDAO extends BatchedSQLDataSource {
  constructor(config: BatchedSQLDataSourceProps) {
    super(config)
  }
  public async offersByUserId(userId: string): Promise<Offer[]> {
    return this.db.query
      .select('*')
      .from('public.CandidateOffersView')
      .where('userId', userId)
  }
  public async offer(id:string): Promise<Offer> {
    return this.db.query
      .select('*')
      .from('public.CandidateOffersView')
      .where('offerId', id)
      .first()
  }
  public async createOffer(offer: OfferInput) {
    return this.db.query
      .insert(offer)
      .into('public.Offer')
      .returning('*')
  }
  public async updateOfferStatus(id: string, status: string) {
    return this.db.query
      .update({ status })
      .from('public.Offer')
      .where('id', id)
      .returning('*')
  }
}
