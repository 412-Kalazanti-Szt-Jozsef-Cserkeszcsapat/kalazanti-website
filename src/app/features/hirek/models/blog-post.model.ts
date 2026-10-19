export interface UserPreview {
  first_name?: string;
  last_name?: string;
}

export interface BlogPostListItem {
  title: string;
  url: string;
  summary: string;
  created_at: string;
  thumbnailImage?: string | null;
  created_by?: UserPreview | null;
}

export interface BlogPost {
  title: string;
  url: string;
  thumbnailImage?: string | null;
  content: string;
  tags?: Tag[];
  author?: string;
  authorName?: string;
  publishedDate?: string;
  date?: string;
  created_at?: string;
  lead?: string;
  summary?: string;
  excerpt?: string;
  description?: string;
  created_by?: UserPreview | null;
}

export interface Tag {
  name: string;
}