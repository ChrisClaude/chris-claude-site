'use client';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/_lib/graphql/queries/user';
import { PagedListDto, UserDto } from '@/_lib/graphql/types';
import { Button } from '@heroui/react';
import Image from 'next/image';
import EditUserModal from './EditUserModal';

const PAGE_SIZE = 10;

const UsersTable = () => {
  const [page, setPage] = useState(0);
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);

  const { data, loading, error, refetch } = useQuery<{
    getUsers: PagedListDto<UserDto>;
  }>(GET_USERS, {
    variables: { page, pageSize: PAGE_SIZE },
    fetchPolicy: 'cache-and-network',
  });

  const users = data?.getUsers;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">User Management</h1>

      {error && (
        <p className="text-sm text-danger mb-4">
          Failed to load users. Please try again.
        </p>
      )}

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">
                User
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">
                Email
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300">
                Roles
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-300 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {loading && !users && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            )}
            {!loading && !error && users?.items.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found.
                </td>
              </tr>
            )}
            {users?.items.map(user => (
              <tr
                key={user.id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={`${user.name} ${user.surname}`}
                          fill
                          className="object-cover"
                          unoptimized={user.image.includes('127.0.0.1')}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-500 dark:text-gray-300">
                          {user.name[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {user.name} {user.surname}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {user.userRoles.map(ur => (
                      <span
                        key={ur.role?.name}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {ur.role?.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onPress={() => setEditingUser(user)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users && (users.hasPreviousPage || users.hasNextPage) && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {users.pageIndex + 1} of {users.totalPages} &middot;{' '}
            {users.totalCount} users
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              isDisabled={!users.hasPreviousPage}
              onPress={() => setPage(p => p - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              isDisabled={!users.hasNextPage}
              onPress={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={() => {
            setEditingUser(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default UsersTable;
