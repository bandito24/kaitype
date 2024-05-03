import {useCallback, useState} from 'react'
import {Comment} from '@/lib/types.tsx'
import EditingComment from '@/components/challenge/discussion/EditingComment.tsx'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import ErrorList from '@/components/utilities/ErrorList.tsx'
import {deleteComment, loadCommentReplies} from '@/services/api.tsx'
import {destructureErrorObject} from '@/lib/helperFunctions.tsx'
import ReplyingComment from '@/components/challenge/discussion/ReplyingComment.tsx'

type Props = {
  comment: Comment
  userId: number | null
  challengeId: string | undefined
  depth: number
}

export default function DiscussionComment({
  comment,
  userId,
  challengeId,
  depth,
}: Props) {
  const [showSelfCommentOptions, setShowSelfCommentOptions] =
    useState<boolean>(false)
  const isOwnPost = comment.user_id === userId
  const [editingPost, setEditingPost] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [errors, setErrors] = useState<string | null>(null)
  const [replyingToComment, setReplyingToComment] = useState<boolean>(false)
  const [replies, setReplies] = useState<Comment[] | []>([])

  const {mutateAsync: deleteAsync} = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['challengeDiscussion', challengeId],
      })
      setErrors('')
      console.log(data)
    },
    onError: (e: any) => {
      setErrors(destructureErrorObject(e))
    },
  })

  const fetchReplies = useCallback(async () => {
    const result = await loadCommentReplies(comment.id)
    console.log(result)
    setReplies(result.data.comments)
  }, [comment.id])

  async function handleDelete() {
    if (comment.has_response) {
      setErrors("You can't remove a comment after someone has replied to it")
      return
    }
    await deleteAsync(comment.id)
  }

  return (
    <div className={`ml-${depth * 4}`}>
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
            className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
            onClick={(e) => {
              e.preventDefault()
              setReplyingToComment((prev) => !prev)
            }}>
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
          {comment.has_response && (
            <button
              className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
              onClick={(e) => {
                e.preventDefault()
                fetchReplies()
              }}>
              <svg
                version="1.1"
                viewBox="0 0 1200 1200"
                xmlns="http://www.w3.org/2000/svg"
                height="24px">
                <g fill="#c8c8ca">
                  <path d="m264 971.04c18.305 10.625 39.605 14.898 60.59 12.164s40.48-12.324 55.449-27.281l67.68-67.922h392.28c38.191 0 74.816-15.172 101.82-42.176 27.004-27.008 42.176-63.633 42.176-101.82v-384c0-38.191-15.172-74.816-42.176-101.82-27.008-27.004-63.633-42.176-101.82-42.176h-120c-17.148 0-32.996 9.1484-41.57 24-8.5742 14.852-8.5742 33.148 0 48 8.5742 14.852 24.422 24 41.57 24h120c12.73 0 24.938 5.0586 33.941 14.059 9 9.0039 14.059 21.211 14.059 33.941v384c0 12.73-5.0586 24.938-14.059 33.941-9.0039 9-21.211 14.059-33.941 14.059h-392.28c-25.469-0.019531-49.898 10.082-67.918 28.078l-67.801 67.922v-168c0-17.148-9.1484-32.996-24-41.57-14.852-8.5742-33.148-8.5742-48 0-14.852 8.5742-24 24.422-24 41.57v164.76c-0.48047 35.246 17.797 68.102 48 86.277z" />
                  <path d="m412.08 480h-100.08c-13.586-0.066406-26.559 5.6289-35.711 15.672-9.1484 10.039-13.613 23.488-12.289 37.008 1.5117 12.129 7.4609 23.27 16.703 31.27 9.2383 8 21.117 12.293 33.336 12.051h165.96c25.461 0 49.879-10.113 67.883-28.117 18.004-18.004 28.117-42.422 28.117-67.883v-165.96c0.24219-12.219-4.0508-24.098-12.051-33.336-8-9.2422-19.141-15.191-31.27-16.703-13.52-1.3242-26.969 3.1406-37.008 12.289-10.043 9.1523-15.738 22.125-15.672 35.711v100.08l-182.04-182.04c-12.133-12.133-29.816-16.871-46.391-12.43-16.574 4.4414-29.52 17.387-33.961 33.961-4.4414 16.574 0.29688 34.258 12.43 46.391z" />
                </g>
              </svg>
              View Replies
            </button>
          )}
        </div>
        {replyingToComment && (
          <div className="mt-2">
            <ReplyingComment
              parentId={comment.id}
              setReplyingToComment={setReplyingToComment}
            />
          </div>
        )}
        {errors && <ErrorList errors={errors} />}
      </article>
      {replies.length > 0 &&
        replies.map((reply: Comment) => (
          <DiscussionComment
            key={reply.id}
            comment={reply}
            userId={userId}
            challengeId={challengeId}
            depth={depth + 1}
          />
        ))}
    </div>
  )
}
