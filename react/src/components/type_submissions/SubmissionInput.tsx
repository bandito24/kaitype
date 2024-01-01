import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {Button} from "@/components/ui/button.tsx";
import {useRef} from "react";
import CategoryInput from "@/components/type_submissions/CategoryInput.tsx";
import * as React from "react";

export default function SubmissionInput() {
    const mainInputRef = useRef<HTMLTextAreaElement>(null)
    const [categoryValue, setCategoryValue] = React.useState<string>("")

    //SPLITS LINES BY NEWLINE. KEEPING EMPTY FORMATTING SPACE, WILL FILTER IT OUT FOR INPUTTING
    function formatSubmission(rawInput){
        return JSON.stringify(rawInput.split('\n'));
        // return JSON.stringify(splitByLines.filter((line: string) => line));
    }

    function onSubmit(e): void{
        e.preventDefault();
        const submission = mainInputRef.current?.value;
        if(submission){
            const formattedSubmission = formatSubmission(submission)
            console.log(JSON.parse(formattedSubmission))
        } else {
            console.log('null')
        }

    }

    return (
        <form className="mt-40" onSubmit={onSubmit}>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Content of your Kaitype challenge</Label>
                <Textarea ref={mainInputRef} placeholder="Type your message here." id="message" />
            </div>
            <CategoryInput
                setCategoryValue={setCategoryValue}
                categoryValue={categoryValue}
            />
            <Button className="mt-5">Add submission</Button>
        </form>
    )
}