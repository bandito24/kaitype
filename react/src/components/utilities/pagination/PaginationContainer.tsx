import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import * as React from "react";


type PageObj = {
    currentPage: number;
    lastPage: number
}

// Define the type for props of your component
type PageProps = {
    pageObj: PageObj;
    setPageObj: React.Dispatch<React.SetStateAction<PageObj | null>>
}


export default function ({pageObj, setPageObj}: PageProps) {

    function onPageChange(direction: number) {
        setPageObj(prev => {
            if (prev !== null) {
                return {
                    ...prev,
                    currentPage: prev.currentPage + direction
                };
            }
            return null;
        });
    }

    return (
        <>
            <Pagination>
                <PaginationContent>

                        <PaginationItem className={`cursor-pointer invisible ${pageObj.currentPage !== 1 ? 'visible' : ''}`}>
                            <PaginationPrevious
                                onClick={() => onPageChange(-1)}
                            />
                        </PaginationItem>
                        <PaginationItem className={`cursor-pointer invisible ${pageObj.currentPage !== pageObj.lastPage  ? 'visible' : ''}`}>
                            <PaginationNext
                                onClick={() => onPageChange(1)}
                            />
                        </PaginationItem>

                </PaginationContent>
            </Pagination>
        </>
    )
}