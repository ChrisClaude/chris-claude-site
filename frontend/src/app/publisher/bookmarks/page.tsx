'use client';

import BookmarksList from '@/_components/BookmarksList';

const PublisherBookmarksPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Bookmarks</h1>
      <BookmarksList />
    </div>
  );
};

export default PublisherBookmarksPage;
