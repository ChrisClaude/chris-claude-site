'use client';
import { AuthGuard } from '@/components/auth/AuthGuard';
import ProfileForm from '@/components/profile/ProfileForm';

const ProfilePage = () => {
  return (
    <AuthGuard userType="Reader">
      <ProfileForm />
    </AuthGuard>
  );
};

export default ProfilePage;
