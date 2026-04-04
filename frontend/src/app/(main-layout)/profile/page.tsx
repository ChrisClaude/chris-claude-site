'use client';
import { AuthGuard } from '@/_components/auth/AuthGuard';
import ProfileForm from '@/_components/profile/ProfileForm';

const ProfilePage = () => {
  return (
    <AuthGuard userType={['Admin', 'Publisher', 'Reader']}>
      <ProfileForm />
    </AuthGuard>
  );
};

export default ProfilePage;
