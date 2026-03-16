import { getPayload } from 'payload'
import config from '@/payload.config'
import { isDuplicateError } from '../lib/is-payload-error'

export async function seedAdmin() {
  const payload = await getPayload({ config })
  try {
    const res = await payload.create({
      collection: 'users',
      data: {
        email: process.env.CMS_SEED_ADMIN_EMAIL,
        password: process.env.CMS_SEED_ADMIN_PASSWORD,
      },
      draft: true,
    })
    console.log('Admin user created:', res)
  } catch (error) {
    if (isDuplicateError(error, 'email')) {
      console.log('Admin user already exists, skipping creation.')
    } else {
      console.error('Error creating admin user:', JSON.stringify(error, null, 2))
    }
  }
}
