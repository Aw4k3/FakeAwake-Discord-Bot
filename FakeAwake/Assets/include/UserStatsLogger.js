const FileSystem = require('fs');

const StatsFilePath = './Assets/Data/UserStats.json';
const AvailableStats = [
    'HugsGiven',
    'HugsReceived',
    'BonksGiven',
    'BonksReceived'
]

function LogUserStat(User, Stat, SubUser) {
    if (AvailableStats.includes(Stat)) {
        if (VerifyUser(User, Stat)) {
            UserStats = JSON.parse(FileSystem.readFileSync(StatsFilePath));
            UserStats[User.id][Stat]["Total"] = parseInt(UserStats[User.id][Stat]["Total"]) + 1;
            if (!UserStats[User.id][Stat].hasOwnProperty([SubUser.tag])) {
                UserStats[User.id][Stat][SubUser.tag] = 1;
            } else {
                UserStats[User.id][Stat][SubUser.tag] = parseInt(UserStats[User.id][Stat][SubUser.tag]) + 1;
            }
            FileSystem.writeFileSync(StatsFilePath, JSON.stringify(UserStats, null, 2));
        }
    }
}

function VerifyUser(User, LogParameter) {
    var Exists = true;
    UserStats = JSON.parse(FileSystem.readFileSync(StatsFilePath));

    if (!UserStats.hasOwnProperty(User.id)) {
        UserStats[User.id] = {};
        UserStats[User.id]["User"] = User.tag;
        UserStats[User.id][LogParameter] = {};
        UserStats[User.id][LogParameter]["Total"] = 0;
        Exists = false;
    } else {
        if (!UserStats[User.id].hasOwnProperty(LogParameter)) {
            UserStats[User.id][LogParameter] = {};
            UserStats[User.id][LogParameter]["Total"] = 0;
        }
    }

    FileSystem.writeFileSync(StatsFilePath, JSON.stringify(UserStats, null, 2));

    return Exists;
}

module.exports = {
    LogUserStat,
    AvailableStats
}