export type PagedListDto<T> = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T[];
};

export type RoleDto = {
  name?: string | null;
};

export type UserRoleDto = {
  role?: RoleDto | null;
};

export type PostDto = {
  id: string;
  title: string;
  excerpt?: string | null;
  thumbnail?: string | null;
  slug: string;
  status: string;
  authorId: string;
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
