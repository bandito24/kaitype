import {useStateContext} from "../../../contexts/contextProvider.tsx";
import UserDropdown from "@/components/auth/UserDropdown.tsx";
import AnonymousUserDropdown from "@/components/auth/AnonymousUserDropdown.tsx";
import {DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";


export default function AccountHeader() {
    const {token, user} = useStateContext()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div
                        className="rounded bg-black text-slate-100 px-4 py-2">{token && user ? 'Account' : 'Login'}</div>
                </DropdownMenuTrigger>
                {token && user ?
                    <UserDropdown/>
                    :
                    <AnonymousUserDropdown/>
                }
            </DropdownMenu>

        </>
    )
}