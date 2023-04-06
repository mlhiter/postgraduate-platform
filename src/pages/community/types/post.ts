export interface PostList {
  total: number
  list: Post[]
}
export interface Post {
  topic: PostContent
  topicUser: person[]
  postData: Comment[]
}
export interface Comment {
  post: CommentDetail
  user: person[]
}
export interface CommentDetail {
  id: number
  userId: number
  topicId: number
  diggCount: string
  content: string
  createTime?: any
}
export interface person {
  userId: number
  name: string
  avatar?: any
  level: number
  createTime: string
  modifyTime: string
}

export interface PostContent {
  id: number
  userId: number
  title: string
  content: string
  createTime: string
  cid: number
}