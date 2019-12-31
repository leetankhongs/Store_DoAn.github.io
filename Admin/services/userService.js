const User = require("../models/userModel");

module.exports.findUserByID = async (ID) => {
    return await User.findById(ID);
}

module.exports.load = async (currentPage, pageLength) => {
    const skip = currentPage * pageLength;
    const users = await User.find(null, null, {skip, limit: pageLength}, null);

    return users;
}

module.exports.getUsersCount = async() => {
    return await User.estimatedDocumentCount();
}

module.exports.removeUser = async (_id) => {
    return await User.findByIdAndUpdate(_id, {isDelete: true});
}

module.exports.recoverUser = async (_id) => {
    return await User.findByIdAndUpdate(_id, {isDelete: false});
}
