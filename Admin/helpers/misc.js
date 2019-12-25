module.exports.compareString = (string1, string2, opts) => {
    return string1.localeCompare(string2, undefined, { sensitivity: 'accent' }) === 0 ? opts.fn(this) : opts.inverse(this);
}