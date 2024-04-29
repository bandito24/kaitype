import {useState} from 'react'
import {Comment} from '@/lib/types.tsx'
import EditingComment from '@/components/challenge/discussion/EditingComment.tsx'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import ErrorList from '@/components/utilities/ErrorList.tsx'
import {deleteComment} from '@/services/api.tsx'
import {destructureErrorObject} from '@/lib/helperFunctions.tsx'

type Props = {
  comment: Comment
  userId: number | null
  challengeId: string | undefined
}

export default function DiscussionComment({
  comment,
  userId,
  challengeId,
}: Props) {
  const [showSelfCommentOptions, setShowSelfCommentOptions] =
    useState<boolean>(false)
  const isOwnPost = comment.user.id === userId
  const [editingPost, setEditingPost] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [errors, setErrors] = useState<string | null>(null)

  const {mutateAsync: deleteAsync} = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['challengeDiscussion', challengeId],
      })
      console.log(data)
    },
    onError: (e: any) => {
      setErrors(destructureErrorObject(e))
    },
  })

  async function handleDelete() {
    if (comment.has_response) {
      setErrors("You can't remove a comment after someone has replied to it")
      return
    }
    await deleteAsync(comment.id)
  }

  return (
    <>
      <article className="rounded-lg bg-white p-6 text-base dark:bg-gray-900">
        <footer className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
              <img
                className="mr-2 h-6 w-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Michael Gough"
              />
              {comment.user.username}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time
                dateTime={comment.created_at}
                title={comment.created_at}>
                {comment.created_at}
              </time>
            </p>
            {comment.edited && (
              <p className=" ml-4 text-xs text-gray-600 dark:text-gray-400">
                ~edited~
              </p>
            )}
          </div>

          {isOwnPost && (
            <div className="relative">
              <button
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
                onClick={() => setShowSelfCommentOptions((prev) => !prev)}>
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
              <div
                id="dropdownComment1"
                className="z-10 w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
                <ul
                  className="absolute right-0 top-0 bg-gray-50 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                  style={{display: showSelfCommentOptions ? 'block' : 'none'}}>
                  <li
                    onClick={() => {
                      if (isOwnPost) {
                        setEditingPost(true)
                        setShowSelfCommentOptions(false)
                      }
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Edit
                  </li>
                  <li
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={async () => await handleDelete()}>
                    Remove
                  </li>
                </ul>
              </div>
            </div>
          )}
        </footer>
        {!editingPost ? (
          <p>{comment.content}</p>
        ) : (
          <EditingComment
            postId={comment.id}
            existingContent={comment.content}
            setEditingPost={setEditingPost}
          />
        )}
        <div className="mt-4 flex items-center space-x-4">
          <button
            type="button"
            className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400">
            <svg
              className="mr-1.5 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
            Reply
          </button>
        </div>
        {errors && <ErrorList errors={errors} />}
      </article>
    </>
  )
}
