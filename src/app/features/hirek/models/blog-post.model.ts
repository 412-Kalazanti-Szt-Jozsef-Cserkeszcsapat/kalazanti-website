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
}

export interface Tag {
  name: string;
}