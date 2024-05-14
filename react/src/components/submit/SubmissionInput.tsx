import {Textarea} from '@/components/ui/textarea'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button.tsx'
import {useRef, useState} from 'react'
import CategoryInput from '@/components/submit/CategoryInput.tsx'
import * as React from 'react'
import axiosClient from '@/services/axios-client.tsx'
import ErrorList from '@/components/utilities/ErrorList.tsx'
import {ErrorObject} from '@/lib/types.tsx'

type SubmissionPayload = {
  title: string | undefined
  description: string | undefined
  category: string | undefined
  isCustomCategory: boolean
  content: string | undefined //JSON
  charCount: number
}

export default function SubmissionInput() {
  const mainInputRef = useRef<HTMLTextAreaElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const [categoryValue, setCategoryValue] = React.useState<string>('')
  const [isCustomCat, setIsCustomCat] = React.useState<boolean>(false)
  const [errors, setErrors] = useState<ErrorObject>({})

  //SPLITS LINES BY NEWLINE. KEEPING EMPTY FORMATTING SPACE, WILL FILTER IT OUT FOR INPUTTING

  async function onSubmit(e): Promise<void> {
    setErrors({})
    e.preventDefault()
    const submission = mainInputRef.current?.value
    const title = titleRef.current?.value
    const description = descriptionRef.current?.value

    let charCount = 0
    let formattedSubmission: string | undefined
    if (submission) {
      const submissionArr: string[] = submission.split('\n')
      submissionArr.forEach((line) => (charCount += line.trim().length))
      formattedSubmission = JSON.stringify(submissionArr)
    }

    const payload: SubmissionPayload = {
      title: title,
      description: description,
      category: categoryValue,
      isCustomCategory: isCustomCat,
      content: formattedSubmission,
      charCount: charCount,
    }
    let errorsExist = false
    for (let key in payload) {
      if (!payload[key] && key !== 'isCustomCategory' && key !== 'charCount') {
        setErrors((prev) => ({
          ...prev,
          [key]: [`The ${key} field is required.`],
        }))
        errorsExist = true
      }
    }
    if (errorsExist) return

    console.log(payload)
    try {
      const response = await axiosClient.post('/createSubmission', payload)
      console.log(response)
    } catch (e: any) {
      if (e.status === 422) {
        const {errors} = e.data
        console.log(errors)
        setErrors(() => errors)
      }
      console.error(e)
    }
  }

  return (
    <>
      <form
        className="mt-40"
        onSubmit={onSubmit}>
        {Object.keys(errors).length > 0 && <ErrorList errors={errors} />}
        <div className="mb-10 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title of your submission</Label>
          <Input
            ref={titleRef}
            type="text"
            id="title"
            placeholder="title"
          />
        </div>
        <div className="mb-10 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">
            Brief description of your submission
          </Label>
          <Input
            ref={descriptionRef}
            type="text"
            id="description"
            placeholder="description"
          />
        </div>
        <CategoryInput
          setCategoryValue={setCategoryValue}
          setIsCustomCat={setIsCustomCat}
          categoryValue={categoryValue}
        />
        <div className="mb-10 grid w-full gap-1.5">
          <Label htmlFor="message">Content of your Kaitype challenge</Label>
          <Textarea
            ref={mainInputRef}
            placeholder="Copy and paste or enter your submission here"
            id="message"
          />
        </div>
        {/*<CategoryInput*/}
        {/*  setCategoryValue={setCategoryValue}*/}
        {/*  setIsCustomCat={setIsCustomCat}*/}
        {/*  categoryValue={categoryValue}*/}
        {/*/>*/}
        <Button className="mt-5 flex justify-end">Add submission</Button>
      </form>
    </>
  )
}
