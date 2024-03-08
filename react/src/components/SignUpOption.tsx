import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"


export default function SignUpOption() {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com"/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Enter Password</Label>
                <Input id="password" type="password"/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="password" type="password"/>
            </div>
        </>
    )
}