import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SignUpOption from "@/components/SignUpOption.tsx";
import LoginOption from "@/components/LoginOption.tsx";






export default function AuthWindow({authPath, setAuthPath}) {

    return (
        <div className="w-2/4 left-0 right-0 m-auto top-48 absolute">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className='text-2xl'>{authPath === 'sign-up' ? 'Create Your Account' : 'Log in to Your Account'}</CardTitle>
                    <CardDescription>
                        {authPath === 'sign-up' ? 'Enter your information to create your account' : 'Enter your information to log in'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline"
                        onClick={()=> setAuthPath('sign-up')}
                        >
                            Create Account
                        </Button>
                        <Button variant="outline"
                                onClick={()=> setAuthPath('sign-in')}
                        >
                            Login
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
          
                        </div>
                    </div>
                    {authPath === 'sign-up' ?
                    <SignUpOption /> :
                    <LoginOption />
                }
                </CardContent>
                <CardFooter>
                    <Button className="w-full">{authPath === 'sign-up' ? 'Create Account' : 'Log In'}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}