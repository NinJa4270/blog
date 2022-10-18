Array.prototype._indexOf = function (element, startIndex = 0) {
    if (startIndex * 1 < 0) {
        startIndex = startIndex + this.length
    }
    for (let i = startIndex; i < this.length; i++) {
        if (element === this[i]) {
            return i
        }
    }
    return -1
}