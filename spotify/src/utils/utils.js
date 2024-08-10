
function getRandoms(num, range) {
    // returns an array of num random numbers between 0 and range

    const randoms = new Set()

    while (randoms.size < num) {
        let n = Math.floor(Math.random() * range)
        randoms.add(n)
    }

    console.log("randoms", randoms)

    return randoms
}

function getRecArtistArray(indices, array) {
    let list = Array.from(indices)
        .map(index => array[index])
        .filter(item => item !== undefined)

        console.log(list)
    return list
}
export {
    getRandoms,
    getRecArtistArray
}