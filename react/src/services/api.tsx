import axiosClient from '@/services/axios-client.tsx'

type newComment = {
  content: string
  challengeId: string
  parentId?: number | null
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
    console.log(axiosResponse)
    return destructureData(axiosResponse)
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

export async function deleteComment(obj: {
  postId: number
  parentId: number | null | undefined
}) {
  console.log(obj)
  const url =
    `/discussion/delete?postId=${obj.postId}` +
    (obj.parentId ? `&parentId=${obj.parentId}` : '')
  const axiosResponse = await axiosClient.delete(url)
  return destructureData(axiosResponse)
}

export async function loadCommentReplies(parentId: number) {
  return await axiosClient.get(`/discussion/reply/index/${parentId}`)
}

export async function voteComment(payload: {
  userId: number
  direction: 1 | -1
}) {
  console.log(payload)
}

function destructureData(response) {
  const {data} = response
  return data
}
