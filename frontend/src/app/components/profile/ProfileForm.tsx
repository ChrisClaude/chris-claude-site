'use client';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAuth } from '@/_hooks/useAuth';
import {
  REQUEST_IMAGE_UPLOAD_URL,
  UPDATE_USER,
} from '@/_lib/graphql/mutations/user';
import { GET_ME } from '@/_lib/graphql/queries/user';
import { UserDto } from '@/_lib/graphql/types';
import { Button, toast } from '@heroui/react';
import Image from 'next/image';
import { logError } from '@/_lib/logging.utils';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_MB = 5;

const ProfileForm = () => {
  const { userProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(userProfile?.name ?? '');
  const [surname, setSurname] = useState(userProfile?.surname ?? '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    userProfile?.image ?? null,
  );
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (success) {
      toast.success('Profile updated successfully.');
    }
  }, [success]);

  const [requestImageUploadUrl] = useMutation<{
    requestImageUploadUrl: {
      imageUploadToken: { uploadUrl: string; blobUrl: string } | null;
    };
  }>(REQUEST_IMAGE_UPLOAD_URL);

  const [updateUser] = useMutation<{ updateUser: { userDto: UserDto | null } }>(
    UPDATE_USER,
    {
      refetchQueries: [{ query: GET_ME }],
    },
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG, and WebP images are supported.');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImageToBlob = async (file: File): Promise<string> => {
    const { data } = await requestImageUploadUrl({
      variables: { input: { fileName: file.name, contentType: file.type } },
    });

    if (!data?.requestImageUploadUrl?.imageUploadToken) {
      throw new Error('Failed to obtain upload URL.');
    }

    const { uploadUrl, blobUrl } = data.requestImageUploadUrl.imageUploadToken;

    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'x-ms-blob-type': 'BlockBlob', 'Content-Type': file.type },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Blob upload failed: ${response.statusText}`);
    }

    return blobUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      let imageUrl: string | null = userProfile?.image ?? null;

      if (pendingFile) {
        imageUrl = await uploadImageToBlob(pendingFile);
      }

      await updateUser({
        variables: {
          input: {
            name: name.trim(),
            surname: surname.trim(),
            image: imageUrl,
          },
        },
      });

      setPendingFile(null);
      setSuccess(true);
    } catch (err) {
      logError('Profile update failed', 'ProfileForm', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile picture"
                fill
                className="object-cover"
                unoptimized={previewUrl.startsWith('blob:')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-gray-500 dark:text-gray-300 select-none">
                {(name || userProfile?.name || '?')[0].toUpperCase()}
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onPress={() => fileInputRef.current?.click()}
          >
            Change photo
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Fields */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            First name
          </span>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={isSubmitting}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-gray-300 dark:focus:ring-gray-700"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Last name
          </span>
          <input
            value={surname}
            onChange={e => setSurname(e.target.value)}
            required
            disabled={isSubmitting}
            className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-gray-300 dark:focus:ring-gray-700"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Email
          </span>
          <input
            value={userProfile?.email ?? ''}
            disabled
            className="rounded-xl border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Email cannot be changed here.
          </span>
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button
          type="submit"
          isDisabled={isSubmitting || !name.trim() || !surname.trim()}
          className="self-start px-8 bg-gray-900 text-white dark:bg-white dark:text-gray-900"
        >
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
