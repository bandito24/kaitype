'use client'

import * as React from 'react'
import {Check, ChevronsUpDown} from 'lucide-react'

import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {useEffect, useReducer, useRef, useState} from 'react'
import axiosClient from '@/services/axios-client.tsx'
import {RetrievedCategory} from '@/lib/types.tsx'
import {Label} from '@/components/ui/label.tsx'

type SubmissionOption = {
  value: string
  label: string
}

type CatProps = {
  setCategoryValue: React.Dispatch<React.SetStateAction<string>>
  setIsCustomCat: React.Dispatch<React.SetStateAction<boolean>>
  categoryValue: string
}

export default function CategoryInput({
  setCategoryValue,
  setIsCustomCat,
  categoryValue,
}: CatProps) {
  const [open, setOpen] = useState(false)
  const [categoryOptions, setCategoryOptions] =
    useState<Array<SubmissionOption> | null>(null)
  const categoryRef = useRef<HTMLInputElement>(null)
  const [entireCategoryList, setEntireCategoryList] = useState<
    [] | SubmissionOption[]
  >([])

  // function reducer(state, action) {
  //   if (action.type === 'incremented_age') {
  //     return {
  //       age: state.age + 1,
  //     }
  //   }
  //   throw Error('Unknown action.')
  // }
  //
  // const [state, dispatch] = useReducer(reducer, {age: 32})

  useEffect(() => {
    async function fetchCategories() {
      try {
        const axiosResponse = await axiosClient.get('/categories')
        if (axiosResponse.status === 200) {
          const categories: Array<RetrievedCategory> = axiosResponse.data
          console.log('cat', axiosResponse.data)
          const allCategories: Array<SubmissionOption> = categories.map(
            (category) => ({
              value: category.name,
              label: category.name,
            })
          )
          setCategoryOptions(allCategories)
          setEntireCategoryList(allCategories)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchCategories()
  }, [])

  function handleInput() {
    if (categoryRef.current?.value) {
      setCategoryOptions(() =>
        entireCategoryList.filter(
          (val) =>
            categoryRef.current &&
            val.value.toLowerCase().indexOf(categoryRef.current.value) === 0
        )
      )
    } else {
      setCategoryOptions(entireCategoryList)
    }
  }

  function handleCustomCategorySelect() {
    if (categoryRef.current?.value) {
      setCategoryValue(categoryRef.current?.value)
      setIsCustomCat(true)
      setOpen(false)
    }
  }

  return (
    <div className="mb-10">
      <Label htmlFor="category-input">Where to find your submission</Label>
      <div id="category-input">
        <Popover
          open={open}
          onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] cursor-pointer justify-between">
              {categoryValue && categoryOptions
                ? categoryValue
                : 'Search categories...'}

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                onInput={handleInput}
                placeholder="Search categories..."
                ref={categoryRef}
              />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandEmpty>
                <Button onClick={() => handleCustomCategorySelect()}>
                  Create Category
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {categoryOptions &&
                  categoryOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={(currentValue) => {
                        setCategoryValue(
                          currentValue === categoryValue
                            ? ''
                            : currentValue.charAt(0).toUpperCase() +
                                currentValue.slice(1)
                        )
                        setIsCustomCat(false)
                        setOpen(false)
                      }}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          categoryValue === option.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
