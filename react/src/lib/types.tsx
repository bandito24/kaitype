export type UserType = {
    username: string,
}

export type ErrorObject = {
    [key: string]: Array<string>; // Here, 'key' is a string representing the error field name, and 'any[]' is an array of variable values.
};