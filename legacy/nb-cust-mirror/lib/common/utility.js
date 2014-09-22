exports.generate_line = function (n, x) {
    var arr = []
    while (arr.length < n) {
        var randomnumber = Math.ceil(Math.random() * x);
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == randomnumber) {
                found = true;
                break
            }
        }
        if (!found)arr[arr.length] = randomnumber;
    }

    var line = {};
    var bonusIdx = Math.floor(Math.random()*arr.length);
    line.bonus = arr[bonusIdx];
    arr.splice(bonusIdx, 1);
    line.standard = arr;
    return line;
}

exports.guid = function(){
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};
