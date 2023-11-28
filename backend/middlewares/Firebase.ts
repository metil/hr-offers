import * as admin from 'firebase-admin'
import { NextApiRequest } from 'next'
import { CircuitBreak } from "@/backend/middlewares/CircuitBreak";

export class FirebaseAuthentication extends CircuitBreak{
  async isAuthorized(req: NextApiRequest): Promise<boolean> {
    if (!req.headers.authorization) {
      return false
    }
    if (!req.headers.authorization.startsWith('Bearer ')) {
      return false
    }
    const token = req.headers.authorization.split('Bearer ')[1]

    const decodedToken = await admin.auth()
      .verifyIdToken(token)
      .catch((er) => {
        if (er.hasOwnProperty('code') && er.code === 'auth/internal-error') {
          this.incrementCircuitBreaker()
        }
        return false
      })

    return !!decodedToken
  }
}
