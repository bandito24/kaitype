import React, {useEffect, useRef, useState} from 'react'
import {Button} from '@/components/ui/button.tsx'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {editChallengeDiscussion} from '@/services/api.tsx'
import {useParams} from 'react-router-dom'
import ErrorList from '@/components/utilities/ErrorList.tsx'
import {ErrorObject} from '@/lib/types.tsx'
import {destructureErrorObject} from '@/lib/helperFunctions.tsx'

type Props = {
  postId: number
  existingContent: string
  setEditingPost: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditingComment({
  existingContent,
  postId,
  setEditingPost,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState<ErrorObject>()
  const {id: challengeId} = useParams()
  const queryClient = useQueryClient()
  const {mutateAsync: editComment} = useMutation({
    mutationFn: editChallengeDiscussion,
    onSuccess: (data) => {
      setEditingPost(false)
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['challengeDiscussion', challengeId],
      })
    },
    onError: (error: any) => {
      setErrors(destructureErrorObject(error))
    },
  })

  useEffect(() => {
    console.log('id', postId)
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [existingContent])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!textareaRef.current?.value) {
      setErrors("Your edited post can't be empty")
      return
    }
    await editComment({postId: postId, content: textareaRef.current?.value})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          className="mb-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue={existingContent}
          ref={textareaRef}
        />
        <div className="mr-24 inline-flex">
          <Button className="cursor-pointer">Save</Button>
          <Button
            className="ml-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              setEditingPost(false)
            }}>
            Cancel
          </Button>
        </div>
        <ErrorList errors={errors} />
      </form>
    </>
  )
}
