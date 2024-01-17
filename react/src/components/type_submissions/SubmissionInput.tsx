import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import {useRef, useState} from "react";
import CategoryInput from "@/components/type_submissions/CategoryInput.tsx";
import * as React from "react";
import axiosClient from "@/services/axios-client.tsx";
import ErrorList from "@/components/utilities/ErrorList.tsx";
import {ErrorObject} from "@/lib/types.tsx";

type SubmissionPayload = {
    title: string | undefined,
    description: string | undefined,
    category: string,
    isCustomCategory: boolean,
    content: string | undefined //JSON
}


export default function SubmissionInput() {
    const mainInputRef = useRef<HTMLTextAreaElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const [categoryValue, setCategoryValue] = React.useState<string>('')
    const [isCustomCat, setIsCustomCat] = React.useState<boolean>(false)
    const [errors, setErrors] = useState<ErrorObject>({});


    //SPLITS LINES BY NEWLINE. KEEPING EMPTY FORMATTING SPACE, WILL FILTER IT OUT FOR INPUTTING
    function formatSubmission(rawInput: string | undefined): string | undefined {
        if(rawInput){
            return JSON.stringify(rawInput.split('\n'));
        }

    }

    async function onSubmit(e): Promise<void> {
        setErrors({})
        e.preventDefault();
        const submission = mainInputRef.current?.value;
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value


        const formattedSubmission = formatSubmission(submission)
        const payload: SubmissionPayload = {
            title: title,
            description: description,
            category: categoryValue,
            isCustomCategory: isCustomCat,
            content: formattedSubmission
        }
        // const submissionChecks: string[] = ['title', 'description', 'category', 'content']
        let errorsExist = false
        for(let key in payload){
            if(!payload[key] && key !== 'isCustomCategory'){
                setErrors(prev => ({...prev, [key]: [`The ${key} field is required.`]}))
                errorsExist = true
            }
        }
        if(errorsExist) return

        console.log(payload)
        try{
            const response = await axiosClient.post('/createSubmission', payload)
            console.log(response)

        } catch(e: any){
                if(e.status === 422){
                    const { errors } = e.data;
                    console.log(errors)
                    setErrors(() => errors)
                }
            console.error(e)
        }

    }




    return (
        <>
        <form className="mt-40" onSubmit={onSubmit}>
            {Object.keys(errors).length > 0 && <ErrorList errors={errors}/>}
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-10">
                <Label htmlFor="title">Title of your submission</Label>
                <Input ref={titleRef} type="text" id="title" placeholder="title"/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-10">
                <Label htmlFor="description">Brief description of your submission</Label>
                <Input ref={descriptionRef} type="text" id="description" placeholder="description"/>
            </div>
            <div className="grid w-full gap-1.5 mb-10">
                <Label htmlFor="message">Content of your Kaitype challenge</Label>
                <Textarea ref={mainInputRef} placeholder="Copy and paste or enter your submission here" id="message"/>
            </div>
            <CategoryInput
                setCategoryValue={setCategoryValue}
                setIsCustomCat={setIsCustomCat}
                categoryValue={categoryValue}
            />
            <Button className="mt-5 flex justify-end">Add submission</Button>
        </form>
        </>
    )
}