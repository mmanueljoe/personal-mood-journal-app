// get elements by type
export function getElementsByType(type: string, selector: string): HTMLElement[] | HTMLElement | null {
    switch(type){
        case 'id':
            return document.getElementById(selector);
        case 'class':
            return Array.from(document.getElementsByClassName(selector)) as HTMLElement[];
        case 'tag':
            return Array.from(document.getElementsByTagName(selector)) as HTMLElement[];
        default:
            return null;
    }
}


// debounce function
export function debounce(func: Function, delay: number): Function {
    let timeout: ReturnType<typeof setTimeout>;

    return function(this: any,...args: any[]){
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    }
}

// format date
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }) ?? 'Invalid Date';
}