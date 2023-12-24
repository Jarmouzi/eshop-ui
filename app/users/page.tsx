import React from 'react'
import type { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Users',
  description: '',
}


export default async function UsersPage() {
    const usersData: Promise<User[]> = getAllUsers()
    const users = await usersData

    const content = (
        <section>
            <Link href="/"> Back to Home</Link>
            <br/>
            {users.map(user => {
                return (
                <>
                    <p key={user.id}>
                        <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </p>
                </>)
            })}
        </section>
    )

  return content
}
