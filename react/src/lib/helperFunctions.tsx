export function encodeHtmlEntities(str) {
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// export function defaultLanguages(){
//     return ['Python', 'Javascript', 'C++', 'Ruby', 'Java', 'Rust', 'SQL', 'Typescript', 'PHP']
//         [
// //     {
// //         value: 'Python',
// //         label: 'Python',
// //     },
// //     {
// //         value: 'Javascript',
// //         label: 'Javascript,
// //     },
// //     {
// //         value: 'C++',
// //         label: 'C++',
// //     },
// //     {
// //         value: 'Ruby',
// //         label: 'Ruby',
// //     },
// //     {
// //         value: 'Java',
// //         label: 'Java',
// //     },
//     //     {
// //         value: 'Rust',
// //         label: 'Rust',
// //     },
//     //     {
// //         value: 'SQL',
// //         label: 'SQL',
// //     },
//     //     {
// //         value: 'Typescript',
// //         label: "Astro",
// //     },
//     //     {
// //         value: "astro",
// //         label: "Astro",
// //     },
// // ]
// }