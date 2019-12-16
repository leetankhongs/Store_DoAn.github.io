const User = require("../models/userModel");

module.exports.load = async (currentPage, pageLength) => {
    const skip = currentPage * pageLength;
    const users = await User.find(null, null, {skip, limit: pageLength}, null);

    return users;
}

module.exports.getUsersCount = async() => {
    return await User.estimatedDocumentCount();
}

module.exports.removeUser = async (Email) => {
    return await User.findOneAndUpdate({Email}, {isDelete: true});
}

module.exports.recoverUser = async (Email) => {
    return await User.findOneAndUpdate({Email}, {isDelete: false});
}
