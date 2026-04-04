'use client';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, toast } from '@heroui/react';
import { UserDto } from '@/_lib/graphql/types';
import {
  ADMIN_UPDATE_USER,
  ADMIN_UPDATE_USER_ROLES,
} from '@/_lib/graphql/mutations/user';
import { logError } from '@/_lib/logging.utils';

const ALL_ROLES = ['Admin', 'Publisher', 'Reader'] as const;

type Props = {
  user: UserDto;
  onClose: () => void;
  onSaved: () => void;
};

const EditUserModal = ({ user, onClose, onSaved }: Props) => {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    user.userRoles.map(ur => ur.role?.name ?? '').filter(Boolean),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const [adminUpdateUser] = useMutation<{
    adminUpdateUser: { userDto: UserDto | null };
  }>(ADMIN_UPDATE_USER);

  const [adminUpdateUserRoles] = useMutation<{
    adminUpdateUserRoles: { userDto: UserDto | null };
  }>(ADMIN_UPDATE_USER_ROLES);

  const toggleRole = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoles.length === 0) return;

    setIsSubmitting(true);
    try {
      await Promise.all([
        adminUpdateUser({
          variables: {
            input: {
              userId: user.id,
              name: name.trim(),
              surname: surname.trim(),
              image: user.image ?? null,
            },
          },
        }),
        adminUpdateUserRoles({
          variables: {
            input: {
              userId: user.id,
              roles: selectedRoles,
            },
          },
        }),
      ]);

      toast.success('User updated successfully.');
      onSaved();
    } catch (err) {
      logError('Admin user update failed', 'EditUserModal', err);
      toast.danger('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={e => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Edit User
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {user.email}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              First name
            </span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={isSubmitting}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-gray-300 dark:focus:ring-gray-700"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Last name
            </span>
            <input
              value={surname}
              onChange={e => setSurname(e.target.value)}
              required
              disabled={isSubmitting}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-gray-300 dark:focus:ring-gray-700"
            />
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Roles
            </legend>
            <div className="flex gap-4">
              {ALL_ROLES.map(role => (
                <label
                  key={role}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role)}
                    onChange={() => toggleRole(role)}
                    disabled={isSubmitting}
                    className="rounded border-gray-300 text-gray-900 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {role}
                  </span>
                </label>
              ))}
            </div>
            {selectedRoles.length === 0 && (
              <p className="text-xs text-danger">
                At least one role is required.
              </p>
            )}
          </fieldset>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              type="button"
              variant="outline"
              onPress={onClose}
              isDisabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isDisabled={
                isSubmitting ||
                !name.trim() ||
                !surname.trim() ||
                selectedRoles.length === 0
              }
              className="bg-gray-900 text-white dark:bg-white dark:text-gray-900"
            >
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
