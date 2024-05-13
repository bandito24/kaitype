import DiscussionComment from '@/components/challenge/discussion/DiscussionComment.tsx'
import {Button} from '@/components/ui/button.tsx'
import {
  fetchChallengeDiscussion,
  postChallengeDiscussion,
} from '@/services/api.tsx'
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useRef, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {ErrorObject} from '@/lib/types.tsx'
import {Comment} from '@/lib/types.tsx'
import ErrorList from '@/components/utilities/ErrorList.tsx'
import {useStateContext} from '@/contexts/contextProvider.tsx'

export default function ChallengeDiscussion() {
  const [errors, setErrors] = useState<ErrorObject>({})
  const {id: challengeId} = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {user} = useStateContext()
  const commentContentRef = useRef<HTMLTextAreaElement>(null)

  const {data: loadedComments} = useQuery({
    queryFn: () => fetchChallengeDiscussion(challengeId!, user?.id ?? null),
    queryKey: ['challengeDiscussion', challengeId],
  })
  const comments = loadedComments?.challengeComments
  const commentCount = loadedComments?.commentCount
  const pastVotes = loadedComments?.pastVotes

  const {mutateAsync: storeComment} = useMutation({
    mutationFn: postChallengeDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['challengeDiscussion', challengeId],
      })
      setErrors('')
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        setErrors('You need to sign in to post a comment')
      } else {
        setErrors('Something went wrong on our end. Apologies')
      }
    },
    onSettled: () => {
      if (commentContentRef.current) {
        commentContentRef.current.value = ''
      }
    },
  })

  useEffect(() => {
    if (!challengeId) navigate('/')
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    if (!user?.id) {
      setErrors('You need to sign in to post a comment')
      return
    }
    if (!commentContentRef.current?.value) {
      setErrors("Your didn't write anything yet...")
      return
    }
    const content = commentContentRef.current.value
    if (!challengeId || !content) return
    const response = await storeComment({
      challengeId: challengeId,
      content: commentContentRef?.current.value,
    })
    console.log(response)
  }

  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 lg:py-16">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
              Discussion {loadedComments && `(${commentCount})`}
            </h2>
          </div>
          <form
            className="mb-6"
            onSubmit={(e) => onSubmit(e)}>
            <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <label
                htmlFor="comment"
                className="sr-only">
                Your comment
              </label>
              <textarea
                ref={commentContentRef}
                id="comment"
                rows={6}
                className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                required></textarea>
            </div>
            <Button>Post Comment</Button>
            {Object.keys(errors).length > 0 && <ErrorList errors={errors} />}
            {loadedComments && commentCount === 0 && (
              <div className="mt-48 flex  h-auto w-full items-center justify-center">
                <img
                  className="w-48"
                  src="/empty-comment-cat.svg"
                  alt="Empty Comments"
                />
                <h5 className="text-lg font-extrabold text-custom-gray">
                  Wow, es muy empty
                </h5>
              </div>
            )}
          </form>
          {loadedComments &&
            commentCount &&
            comments.map((comment: Comment) => (
              <DiscussionComment
                key={comment.id}
                comment={comment}
                userId={user?.id ?? null}
                challengeId={challengeId}
                depth={0}
                pastVotes={pastVotes}
              />
            ))}
        </div>
      </section>
    </div>
  )
}
