"use client"

import * as React from "react"
import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useEffect} from "react";
import axiosClient from "@/services/axios-client.tsx";

let frameworks: CategoryType[]  = [

]
type CategoryType = {
    id: number;
    name: string;
    submissions_count: number;
};


type CatProps = {
    setCategoryValue: React.Dispatch<React.SetStateAction<string>>,
    categoryValue: string
}

export default function CategoryInput({setCategoryValue, categoryValue}: CatProps) {
    const [open, setOpen] = React.useState(false)
    useEffect(() => {
        async function fetchCategories() {
            try{
                const axiosResponse = await axiosClient.get('/categories')
                if(axiosResponse.status === 200){
                    // const categories: CategoryType = axiosResponse.data
                    // for(key in categories){
                    //     frameworks.push({'value': categories[key].id, 'label': categories[key].name})
                    // }
                    const categories: CategoryType[] = axiosResponse.data;
                    console.log(axiosResponse.data)

                   frameworks = categories.map(category => ({
                        value: category.id,
                        label: category.name
                    }));
                }
            } catch(e){
                console.log(e)
            }
        }
        fetchCategories()

    }, []);




    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between cursor-pointer"
                >
                    {categoryValue
                        ? frameworks.find((framework) => framework.value === categoryValue)?.label
                        : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search categories..."/>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    {/*<Button> Create New Framework </Button>*/}
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    setCategoryValue(currentValue === categoryValue ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        categoryValue === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}