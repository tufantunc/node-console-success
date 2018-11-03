const data = {
    icon: '\u2713',

    greenBg: "\x1b[42m",
    greenFg: "\x1b[32m",
    whiteFg: "\x1b[37m",

    reset: "\x1b[0m"
};

console.success = function() {
    console.log(data.greenBg + data.whiteFg, data.icon, data.reset, data.greenFg, ...arguments, data.reset);
};

module.exports = console.success;