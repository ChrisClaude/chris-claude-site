'use client';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '@/_lib/graphql/mutations/bookmark';
import { GET_MY_BOOKMARKS } from '@/_lib/graphql/queries/bookmark';
import { BookmarkWithPostDto } from '@/_lib/graphql/types';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/_hooks/useAuth';

type Props = {
  postId: string;
};

const BookmarkButton = ({ postId }: Props) => {
  const { isUserSignedIn } = useAuth();

  const { data, loading: queryLoading } = useQuery<{ myBookmarks: BookmarkWithPostDto[] }>(
    GET_MY_BOOKMARKS,
    { skip: !isUserSignedIn, fetchPolicy: 'cache-and-network' }
  );

  const isBookmarked = data?.myBookmarks?.some(b => b.postId === postId) ?? false;

  const refetchOptions = { refetchQueries: [{ query: GET_MY_BOOKMARKS }] };

  const [addBookmark, { loading: adding }] = useMutation(ADD_BOOKMARK, refetchOptions);
  const [removeBookmark, { loading: removing }] = useMutation(REMOVE_BOOKMARK, refetchOptions);

  if (!isUserSignedIn) return null;

  const loading = queryLoading || adding || removing;

  const handleClick = async () => {
    if (loading) return;
    const input = { postId };
    if (isBookmarked) {
      await removeBookmark({ variables: { input } });
    } else {
      await addBookmark({ variables: { input } });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this post'}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
        isBookmarked
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {isBookmarked ? (
        <BookmarkSolidIcon className="w-4 h-4" />
      ) : (
        <BookmarkIcon className="w-4 h-4" />
      )}
      {isBookmarked ? 'Saved' : 'Save'}
    </button>
  );
};

export default BookmarkButton;
