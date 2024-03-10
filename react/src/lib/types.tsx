export type UserType = {
    username: string,
    id: number
}

export type ErrorObject = {
    [key: string]: Array<string>; // Here, 'key' is a string representing the error field name, and 'any[]' is an array of variable values.
};

export type RetrievedCategory = {
    id: number;
    name: string;
    slug: string;
    submissions_count: number;
};