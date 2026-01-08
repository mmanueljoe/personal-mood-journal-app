// get elements by type
export function getElementsByType(type, selector) {
    switch (type) {
        case 'id':
            return document.getElementById(selector);
        case 'class':
            return Array.from(document.getElementsByClassName(selector));
        case 'tag':
            return Array.from(document.getElementsByTagName(selector));
        default:
            return null;
    }
}
// debounce function
export function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}
// format date
export function formatDate(date) {
    return date.toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }) ?? 'Invalid Date';
}
//# sourceMappingURL=utils.js.map