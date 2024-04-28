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
  const axiosReesponse = await axiosClient.patch(
    '/discussion/patch',
    editedPost
  )
  const {data} = axiosReesponse
  return data
}
