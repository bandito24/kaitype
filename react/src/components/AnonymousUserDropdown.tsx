import {
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu.tsx";
import {useState} from "react";
import AuthWindow from "@/components/AuthWindow";


type AuthPath = 'sign-up' | 'sign-in' | ''

export default function AnonymousUserDropdown() {
    const [authPath, setAuthPath] = useState<AuthPath>('')


    return (
        <>
            <DropdownMenuContent>
                <DropdownMenuItem className='hover: cursor-pointer'
                                  onClick={() => setAuthPath('sign-up')}
                >Sign Up</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className='hover: cursor-pointer'
                                  onClick={() => setAuthPath('sign-in')}
                >Sign In</DropdownMenuItem>
            </DropdownMenuContent>
            {authPath && <AuthWindow
                authPath={authPath}
                setAuthPath={setAuthPath}
            />}
        </>
    )
}