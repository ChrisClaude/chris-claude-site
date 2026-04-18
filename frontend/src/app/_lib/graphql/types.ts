export type ConnectionDto<T> = {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
  nodes: T[];
};

export type RoleDto = {
  name?: string | null;
};

export type UserRoleDto = {
  role?: RoleDto | null;
};

export type PostAuthorDto = {
  id: string;
  name: string;
  surname: string;
  image?: string | null;
};

export type PostTagItemDto = {
  tag: {
    id: string;
    name: string;
  };
};

export type PostDto = {
  id: string;
  title: string;
  excerpt?: string | null;
  thumbnail?: string | null;
  slug: string;
  status: string;
  authorId: string;
  content?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  author?: PostAuthorDto | null;
  postTags?: PostTagItemDto[] | null;
};

export type CommentDto = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
};

export type BookmarkDto = {
  postId: string;
  userId: string;
};

export type PostReactionDto = {
  postId: string;
};

export type UserDto = {
  id: string;
  email: string;
  name: string;
  surname: string;
  image?: string | null;
  userRoles: UserRoleDto[];
  bookmarks?: BookmarkDto[] | null;
  postReactions?: PostReactionDto[] | null;
  comments?: CommentDto[] | null;
  posts?: PostDto[] | null;
};
