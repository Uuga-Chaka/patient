function partition(array, callback) {
    return array.reduce((result, element, i) => {
        callback(element, i, array) ?
            result[0].push(element) :
            result[1].push(element)
        return result
    }, [[], []])
}

module.exports = { partitionArray: partition }