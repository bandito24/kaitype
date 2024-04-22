import DiscussionComment from '@/components/challenge/discussion/DiscussionComment.tsx'
import {Button} from '@/components/ui/button.tsx'
import {useEffect, useState} from 'react'
import axiosClient from '@/services/axios-client.tsx'

export default function ChallengeDiscussion() {
  const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false)
  useEffect(() => {
    const results = await axiosClient('/')
  }, [])

  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 lg:py-16">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
              Discussion (20)
            </h2>
          </div>
          <form className="mb-6">
            <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <label
                htmlFor="comment"
                className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                required></textarea>
            </div>
            <Button>Post Comment</Button>
            <DiscussionComment />
          </form>
        </div>
      </section>
    </div>
  )
}
