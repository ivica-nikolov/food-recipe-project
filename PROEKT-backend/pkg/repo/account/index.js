const AccountModel = require('../../model/account/index')

const deleteAccount = async (id) => { 
    return await AccountModel.deleteOne({_id: id});
};
const updateAccount = async (id, newAccount) => { 
    return await AccountModel.updateOne({_id: id }, newAccount);
};
const findAccountByID = async (id) => { 
    return await AccountModel.findById({_id: id});
};
const findAccountByEmail = async (email) => { 
    const filterByObject = { email: email };
    return await AccountModel.findOne(filterByObject);
};
const findAccountByName = async (firstName , lastName) => { 
    return await AccountModel.findOne({ firstName: firstName, lastName : lastName });
};
const getAllAccounts = async () => { 
    return await AccountModel.find({})
};
const createAccount = async (account) => { 
    const newAccount = new AccountModel(account);
    return await newAccount.save();
};

module.exports = {
    createAccount,
    deleteAccount,
    updateAccount,
    findAccountByID,
    getAllAccounts,
    findAccountByEmail,
    findAccountByName,
}