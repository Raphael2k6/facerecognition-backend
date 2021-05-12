let numbers = [21, 45, 4, 9, 12, 98, 1, 3, 14]
let selectionSort = (array) => {
    let length = array.length;
    for (let i = 0; i < length; i++) {
        if (array[i] < array[0]) {
            console.log(array.unshift(array.splice(i, 1)[0]))
        } else {
            for (let j = 1; j < i; j++) {
                if (array[i] > array[j - 1] && array[i] < array[j]) {
                    array.splice(j, 0, array.splice(i, 1)[0])
                }
            }
        }
    }
}

selectionSort(numbers)
console.log(numbers)