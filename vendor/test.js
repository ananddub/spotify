const arr = [1, 2, 4, 5]

const curIndex = arr.findIndex((i) => {
    return i === 2
})

const nextIndex = (curIndex + 1) % arr.length

console.log(12 % 8)
