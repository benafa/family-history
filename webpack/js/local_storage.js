export function getFromLocalStorage(key, delete_after = true) {
    // Retrieve the item from local storage
    const value = localStorage.getItem(key);

    if (value !== null) {
        console.log('Retrieved value:', value);

        if (delete_after) {
            localStorage.removeItem(key);
            console.log('Item removed.');
        }

        return value
    } else {
        console.log('No value found for key:', key);
        return null 
    }
}