exports.StatusColor = function(type = '') {
    switch (type.toUpperCase()) {
        default:
            return '#ffffff';

        case 'ERROR':
            return '#ff0000'; // Red

        case 'WARN':
            return '#ffff00'; // Yellow

        case 'OK':
            return '#7d46e3'; // Purple
    }
}

exports.InvalidCommandMessage = function () {
    return 'User entered invalid command.';
}