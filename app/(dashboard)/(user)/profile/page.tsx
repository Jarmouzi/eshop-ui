'use server'
import { Suspense } from "react";
import { Metadata } from "next";
import Profile from "@/components/profile";
import { getUserProfile } from "@/lib/services/UserProfileService";
//import { useRouter } from "next/navigation";

//export const runtime = 'edge';

//export const revalidate = 60; // 12 hours in seconds

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'پروفایل کاربر',
    description: '',
    openGraph: {
      // publishedTime: page.createdAt,
      // modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function ProfilePage() {
  const profile = await getUserProfile();

  return (
    <Suspense>            
      <Profile userProfile={profile} />
     </Suspense>
  );
}