import {Input} from '@/components/ui/input.tsx'
import {Label} from '@/components/ui/label.tsx'
import {CardFooter} from '@/components/ui/card.tsx'
import {Button} from '@/components/ui/button.tsx'
import axiosClient from '@/services/axios-client.tsx'
import React, {RefObject, useRef} from 'react'
import {UserType} from '@/lib/types.tsx'
import {useStateContext} from '@/contexts/contextProvider.tsx'

type SignUpFormParameters = {
  email: string
  username: string
  password: string
  confirm_password: string
}
type SignUpResponse = {
  status: string
  message: string
  token: string
  user: UserType
}
export default function SignUpForm({setErrors}) {
  const emailRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
  const usernameRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null)
  const passwordRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null)
  const confirmPasswordRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload: SignUpFormParameters = {
      email: emailRef.current?.value || '',
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirm_password: confirmPasswordRef.current?.value || '',
    }
    try {
      const axiosResponse = await axiosClient.post('/signup', payload)
      const response: SignUpResponse = axiosResponse.data
      setUser(response.user)
      setToken(response.token)
      console.log(response)
    } catch (e: any) {
      if (e.status === 422) {
        const {errors} = e.data
        console.log(errors)
        setErrors(() => errors)
      }
    }
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          ref={usernameRef}
          className="mb-4"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          ref={emailRef}
          className="mb-4"
          id="email"
          type="email"
          placeholder="email@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Enter Password</Label>
        <Input
          ref={passwordRef}
          className="mb-4"
          id="password"
          type="password"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          ref={confirmPasswordRef}
          className="mb-6"
          id="confirm_password"
          type="password"
        />
      </div>
      <CardFooter>
        <Button className="w-full">Sign Up</Button>
      </CardFooter>
    </form>
  )
}
