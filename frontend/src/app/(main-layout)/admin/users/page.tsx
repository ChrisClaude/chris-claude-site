'use client';
import { AuthGuard } from '@/_components/auth/AuthGuard';
import UsersTable from '@/_components/admin/UsersTable';

const AdminUsersPage = () => {
  return (
    <AuthGuard userType="Admin">
      <UsersTable />
    </AuthGuard>
  );
};

export default AdminUsersPage;
