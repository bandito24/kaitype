import {
    Card,
    CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Button} from "@/components/ui/button.tsx"
import SignUpForm from "@/components/auth/SignUpForm.tsx";
import SignInForm from "@/components/auth/SignInForm.tsx";
import ErrorList from "@/components/utilities/ErrorList.tsx";
import {useState} from "react";

type ErrorObject = {
    [key: string]: Array<string>; // Here, 'key' is a string representing the error field name, and 'any[]' is an array of variable values.
};

export default function AuthWindow({authPath, setAuthPath}) {
    const [errors, setErrors] = useState<ErrorObject>({});

    return (
        <div className="w-2/4 left-0 right-0 m-auto top-48 absolute">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle
                        className='text-2xl'>{authPath === 'sign-up' ? 'Create Your Account' : 'Log in to Your Account'}</CardTitle>
                    <CardDescription>
                        {authPath === 'sign-up' ? 'Enter your information to create your account' : 'Enter your information to log in'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline"
                                onClick={() => {
                                    setAuthPath('sign-up')
                                    setErrors({})
                                }}
                        >
                            Create Account
                        </Button>
                        <Button variant="outline"
                                onClick={() => {
                                    setAuthPath('sign-in')
                                    setErrors({})
                                }}
                        >
                            Login
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">

                        </div>
                    </div>
                    {authPath === 'sign-up' ?
                        <SignUpForm
                        setErrors={setErrors}
                        /> :
                        <SignInForm
                        setErrors={setErrors}
                        />
                    }
                    {Object.keys(errors).length > 0 && <ErrorList errors={errors}/>}
                </CardContent>

            </Card>
        </div>
    )
}