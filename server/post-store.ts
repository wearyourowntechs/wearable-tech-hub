// Simple in-memory store for posts during the session
interface Post {
  id: number;
  caption: string;
  facebookCaption?: string;
  instagramCaption?: string;
  tiktokCaption?: string;
  xCaption?: string;
  pinterestCaption?: string;
  platforms: string[];
  imageUrl?: string;
  amazonLink?: string;
  affiliateLink?: string;
  hashtags?: string;
  status: "draft" | "pending_approval" | "approved" | "scheduled" | "posted" | "failed";
  createdAt: Date;
  scheduledTime?: Date;
}

class PostStore {
  private posts: Map<number, Post> = new Map();
  private nextId: number = 1;

  addPost(post: Omit<Post, "id" | "createdAt">): Post {
    const id = this.nextId++;
    const newPost: Post = {
      ...post,
      id,
      createdAt: new Date(),
      status: post.status || "draft",
    };
    this.posts.set(id, newPost);
    return newPost;
  }

  getPost(id: number): Post | undefined {
    return this.posts.get(id);
  }

  getAllPosts(status?: string): Post[] {
    const posts = Array.from(this.posts.values());
    if (status) {
      return posts.filter((p) => p.status === status);
    }
    return posts;
  }

  updatePost(id: number, updates: Partial<Post>): Post | undefined {
    const post = this.posts.get(id);
    if (!post) return undefined;
    const updated = { ...post, ...updates };
    this.posts.set(id, updated);
    return updated;
  }

  deletePost(id: number): boolean {
    return this.posts.delete(id);
  }
}

export const postStore = new PostStore();
