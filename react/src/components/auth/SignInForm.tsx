import {Input} from '@/components/ui/input.tsx'
import {Label} from '@/components/ui/label.tsx'
import {Button} from '@/components/ui/button.tsx'
import {CardFooter} from '@/components/ui/card.tsx'
import React, {RefObject, useRef} from 'react'
import axiosClient from '@/services/axios-client.tsx'
import {useStateContext} from '@/contexts/contextProvider.tsx'
import {UserType} from '@/lib/types.tsx'

type SignInFormParameters = {
  email: string
  password: string
}
type SignInResponse = {
  status: string
  message: string
  token: string
  user: UserType
}

export default function SignInForm({setErrors}) {
  const emailRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
  const passwordRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload: SignInFormParameters = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    }
    try {
      const axiosResponse = await axiosClient.post('/signin', payload)
      const response: SignInResponse = axiosResponse.data
      setUser(response.user)
      setToken(response.token)
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
        <Label htmlFor="email">Email</Label>
        <Input
          ref={emailRef}
          className="mb-4"
          id="email"
          type="email"
          placeholder="m@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Enter Password</Label>
        <Input
          ref={passwordRef}
          className="mb-6"
          id="password"
          type="password"
        />
      </div>
      <CardFooter>
        <Button className="w-full">Login</Button>
      </CardFooter>
    </form>
  )
}
