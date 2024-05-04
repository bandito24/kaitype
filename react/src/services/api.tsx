import axiosClient from '@/services/axios-client.tsx'

type newComment = {
  isReply: boolean
  content: string
  challengeId: string
}

export async function fetchCategories(page: string) {
  try {
    const axiosResponse = await axiosClient.get(`/categories?page=${page}`)
    if (axiosResponse.status === 200) {
      return axiosResponse.data
    }
  } catch (e) {
    console.log(e)
  }
}

export async function fetchChallengeDiscussion(challengeId: string) {
  try {
    const axiosResponse = await axiosClient.get(`/discussion/${challengeId}`)
    const {data} = axiosResponse
    return data
  } catch (e) {
    console.error(e)
  }
}

export async function postChallengeDiscussion(commentInfo: newComment) {
  const axiosResponse = await axiosClient.post(`/discussion/store`, commentInfo)
  const {data} = axiosResponse
  return data
}

export async function editChallengeDiscussion(editedPost: {
  postId: number
  content: string
}) {
  const axiosResponse = await axiosClient.patch('/discussion/patch', editedPost)
  const {data} = axiosResponse
  return data
}

export async function deleteComment(postId: number) {
  return await axiosClient.delete(`/discussion/delete/${postId}`)
}

export async function createCommentReply(replyInfo: {
  parentId: number
  content: string
  isTopComment: boolean
}) {
  return await axiosClient.post('/discussion/reply/store', replyInfo)
}

export async function loadCommentReplies(parentId: number) {
  return await axiosClient.get(`/discussion/reply/index/${parentId}`)
}
