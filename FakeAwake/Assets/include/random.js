exports.RandFloat = function(min, max) {
    return min + Math.random() * Math.floor(max - min); //Inclusive Min, Exclusive Max
}

exports.RandInt = function(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max - min)); //Inclusive Min, Exclusive Max
}