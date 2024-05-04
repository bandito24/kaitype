import React, {useRef, useState} from 'react'
import {Button} from '@/components/ui/button.tsx'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createCommentReply} from '@/services/api.tsx'
import {useParams} from 'react-router-dom'
import ErrorList from '@/components/utilities/ErrorList.tsx'
import {ErrorObject} from '@/lib/types.tsx'
import {destructureErrorObject} from '@/lib/helperFunctions.tsx'

type Props = {
  parentId: number
  setReplyingToComment: React.Dispatch<React.SetStateAction<boolean>>
  isTopComment: boolean
}
export default function ReplyingComment({
  parentId,
  setReplyingToComment,
  isTopComment,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState<ErrorObject>()
  const {id: challengeId} = useParams()
  const queryClient = useQueryClient()
  const {mutateAsync: createReply} = useMutation({
    mutationFn: createCommentReply,
    onSuccess: (body) => {
      console.log(body)
      setReplyingToComment(false)
      queryClient.invalidateQueries({
        queryKey: ['challengeDiscussion', challengeId],
      })
      setErrors('')
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        setErrors('Please sign in to comment')
        return
      }
      setErrors(destructureErrorObject(error))
    },
  })

  async function handleSubmit(e) {
    e.preventDefault()
    if (!textareaRef.current?.value) {
      setErrors("Your reply can't be empty")
      return
    }
    await createReply({
      parentId: parentId,
      content: textareaRef.current?.value,
      isTopComment: isTopComment,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          className="mb-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={textareaRef}
        />
        <div className="mr-24 inline-flex">
          <Button className="cursor-pointer">Save</Button>
          <Button
            className="ml-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              setReplyingToComment(false)
            }}>
            Cancel
          </Button>
        </div>
        <ErrorList errors={errors} />
      </form>
    </>
  )
}
