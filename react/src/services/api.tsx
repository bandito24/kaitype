import axiosClient from '@/services/axios-client.tsx'

type newComment = {
  content: string
  challengeId: string
  parentId?: number | null
}

export async function fetchCategories(page: string) {
  const requestUrl = `/categories?page=${page}`
  try {
    const axiosResponse = await axiosClient.get(requestUrl)
    if (axiosResponse.status === 200) {
      console.log('response', axiosResponse.data)
      return axiosResponse.data
    }
  } catch (e) {
    console.log(e)
  }
}

export async function fetchCategoryChallenges({
  category,
  page,
}: {
  category: string | null
  page: string
}) {
  if (!category) throw new Error('No category input for the request')
  try {
    const axiosResponse = await axiosClient.get(
      `/categories/${category}?page=${page}`
    )
    if (axiosResponse.status === 200) {
      console.log('challenges response:', axiosResponse.data.categoryChallenges)
      return axiosResponse.data
    }
  } catch (e) {
    console.log(e)
  }
}

export async function fetchChallengeDiscussion(
  challengeId: string,
  userId: number | null
) {
  try {
    const url =
      `/discussion?submission_id=${challengeId}` +
      (userId ? `&user_id=${userId}` : '')
    console.log(url)
    const axiosResponse = await axiosClient.get(url)
    console.log(destructureData(axiosResponse))
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
  challenge_comment_id: number
  direction: 1 | -1 | 2 | -2
  submission_id: string | undefined
}) {
  console.log(payload)
  const response = await axiosClient.patch(`/discussion/vote`, payload)
  return destructureData(response)
}

function destructureData(response) {
  const {data} = response
  return data
}
