export type ToolStatus = 'pending' | 'approved' | 'rejected';

export type Profile = {
  id: string;
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  is_admin: boolean;
};

export type Category = {
  id: string;
  slug: string;
  name_ko: string;
};

export type Tool = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  website_url: string;
  demo_url: string | null;
  thumbnail_url: string | null;
  tags: string[];
  status: ToolStatus;
  launch_date: string | null;
  views: number;
  created_at: string;
  category: Pick<Category, 'slug' | 'name_ko'> | null;
  creator: Pick<Profile, 'username' | 'display_name'> | null;
  likes_count?: number;
};

export type ToolInsert = {
  creator_id: string;
  category_id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  website_url: string;
  demo_url?: string;
  thumbnail_url?: string;
  tags?: string[];
};
