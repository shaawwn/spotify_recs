
function getRandoms(num, range) {
    // returns an array of num random numbers between 0 and range

    const randoms = new Set()

    while (randoms.size < num) {
        let n = Math.floor(Math.random() * range)
        randoms.add(n)
    }

    return randoms
}

function getRecArtistArray(indices, array) {
    let list = Array.from(indices)
        .map(index => array[index])
        .filter(item => item !== undefined)

    return list
}
export {
    getRandoms,
    getRecArtistArray
}