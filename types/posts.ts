type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}

export type { Posts, Comment };
