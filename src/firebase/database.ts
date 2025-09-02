import type { ServiceAccount } from 'firebase-admin'
import admin from 'firebase-admin'
import serviceAccount from './database-service.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
})

export const db = admin.firestore().collection('cuties')
