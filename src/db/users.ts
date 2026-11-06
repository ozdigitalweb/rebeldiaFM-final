import { db } from './index.js';
import { users } from './schema.js';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(
  uid: string,
  email: string,
  displayName?: string,
  photoURL?: string
) {
  const result = await db
    .insert(users)
    .values({
      uid,
      email,
      displayName: displayName || null,
      photoURL: photoURL || null,
    })
    .onConflictDoUpdate({
      target: users.uid,
      set: {
        email,
        displayName: displayName || null,
        photoURL: photoURL || null,
      },
    })
    .returning();

  return result[0];
}
