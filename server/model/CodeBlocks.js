const CodeBlocks = [
    {
        id: 1,
        title: "For Loop",
        code: "// Create a javascript arrow function that adds up all the number from 1 to 100",
        solution: `const sum = (n) => {
            let total = 0;
            for (let i = 1; i <= n; i++) {
                total += i;
            }
            return total;
        }`
    },

    {
        id: 2,
        title: "Bubble Sort",
        code: "// Implement bubble sort algorithm in javascript",
        solution: `const bubbleSort = (arr) => {
            let swapped;
            do {
                swapped = false;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] > arr[i + 1]) {
                        let temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        swapped = true;
                    }
                }
            } while (swapped);
            return arr;
        }`
    },

    {
        id: 3,
        title: "Palindrome Check",
        code: "// Checkc if a given string is a palindrome",
        solution: `const isPalindrome = (str) => {
            let reversed = str.split("").reverse().join("");
            return str === reversed;
        }`
    },

    {
        id: 4,
        title: "Reverse String",
        code: "// Reverse a given string",
        solution: `const reverseString = (str) => {
            return str.split("").reverse().join("");
        }`
    }
]

module.exports = { CodeBlocks };