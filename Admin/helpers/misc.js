module.exports.compareString = (string1, string2, opts) => {
    return string1.localeCompare(string2, undefined, { sensitivity: 'accent' }) === 0 ? opts.fn(this) : opts.inverse(this);
}

module.exports.compareID = (id1, id2, opts) => {
    return id1.equals(id2) ? opts.fn(this) : opts.inverse(this);
}