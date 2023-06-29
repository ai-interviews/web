import { getServerUser } from '@/app/_lib/server/getServerUser';
import React from 'react';

export async function ProfilePage() {
  const user = await getServerUser();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <div className="text-2xl">Profile</div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">Name</div>
          <div className="text-sm opacity-50">{user.name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">Email</div>
          <div className="text-sm opacity-50">{user.email}</div>
        </div>  
        <div className="flex flex-col gap-2">
          <div className="text-xl">LinkedIn URL</div>
          <div className="text-sm opacity-50">{user.linkedIn}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">Country</div>  
          <div className="text-sm opacity-50">{user.country}</div>
        </div>
      </div>
    </div>
  )
}
