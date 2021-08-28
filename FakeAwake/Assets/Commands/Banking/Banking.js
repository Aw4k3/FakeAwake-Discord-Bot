const FileSystem = require('fs');

const BankingStatsFile = './Assets/Data/Banking.json';
const Currencys = [
    'PauseFish',
    'GachiGold'
]

function VerifyUser(User, Currency) {
    BankStats = JSON.parse(FileSystem.readFileSync(BankingStatsFile));

    if (!BankStats.hasOwnProperty(User.id)) {
        BankStats[User.id] = {};
        BankStats[User.id]["User"] = User.tag;
        BankStats[User.id]["ActiveCurrency"] = Currency;
        BankStats[User.id]["Balance"] = {};
        BankStats[User.id]["Balance"][Currency] = 0;
    } else {
        BankStats[User.id]["ActiveCurrency"] = Currency;
        if (!BankStats[User.id]["Balance"].hasOwnProperty(Currency)) {
            BankStats[User.id]["Balance"][Currency] = 0;
        }
    }

    FileSystem.writeFileSync(BankingStatsFile, JSON.stringify(BankStats, null, 2));
}

function DoesUserExist(User) {
    BankStats = JSON.parse(FileSystem.readFileSync(BankingStatsFile));

    if (BankStats.hasOwnProperty(User.id)) {
        return true;
    } else {
        return false;
    }
}

function TickBalance(User) {
    BankStats = JSON.parse(FileSystem.readFileSync(BankingStatsFile));

    if (BankStats.hasOwnProperty(User.id)) {
        BankStats = JSON.parse(FileSystem.readFileSync(BankingStatsFile));

        for (var i = 0; i < Object.keys(BankStats[User.id]["Balance"]).length; i++) {
            BankStats[User.id]["Balance"][Object.keys(BankStats[User.id]["Balance"])[i]] = parseInt(BankStats[User.id]["Balance"][Object.keys(BankStats[User.id]["Balance"])[i]]) + 1;
        }

        FileSystem.writeFileSync(BankingStatsFile, JSON.stringify(BankStats, null, 2))
    }
}

function SetActiveCurrency(User, Currency) {
    BankStats = JSON.parse(FileSystem.readFileSync(BankingStatsFile));

    if (BankStats.hasOwnProperty(User.id)) {
        BankStats[User.id]["ActiveCurrency"] = Currency;
        FileSystem.writeFileSync(BankingStatsFile, JSON.stringify(BankStats, null, 2))
    }
}

module.exports = {
    Currencys,
    DoesUserExist,
    BankingStatsFile,
    TickBalance,
    VerifyUser,
    SetActiveCurrency
}