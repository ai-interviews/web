import { getServerUser } from '@/app/_lib/server/getServerUser';
import React from 'react';

export async function ProfilePage() {
  const user = await getServerUser();

}
