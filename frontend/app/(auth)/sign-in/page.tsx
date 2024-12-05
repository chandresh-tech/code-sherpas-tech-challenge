'use client';
import { UserSelect } from '@/components/selects/UserSelect';
import { setAuthenticatedUser, useAppContext } from '@/store/app';
import { User } from '@/typedefs';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

export default function SigninPage() {
  const router = useRouter();
  const { dispatch } = useAppContext();

  const selectUser = useCallback(
    (value: string) => {
      const user: User = { id: value, name: 'User ' + value };

      dispatch(setAuthenticatedUser(user));
      router.replace(`/`);
    },
    [dispatch, router]
  );

  return (
    <div className='flex justify-center items-center min-h-screen w-screen'>
      <div className='w-full max-w-md border mx-4 border-slate-700 rounded-xl p-6 sm:p-8'>
        <h3 className='text-2xl text-center font-semibold mb-2'>Sign In</h3>
        <p className='text-center mb-4'>Access your account by selecting the user below</p>

        <div className='mt-10'>
          <UserSelect onChange={selectUser} />
        </div>
      </div>
    </div>
  );
}