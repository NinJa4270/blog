Array.prototype._lastIndexOf = function (element, startIndex = this.length - 1) {
    startIndex = startIndex * 1
    if (startIndex < 0) {
        startIndex = this.length + startIndex
    }
    for (let i = startIndex; i > -1; i--) {
        if (element === this[i]) {
            return i
        }
    }
    return -1
}