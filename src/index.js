const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const data = {
    icon: '\u2713',

    greenBg: isBrowser ? "background-color: green;" : "\x1b[42m",
    greenFg: isBrowser ? "color: green;" : "\x1b[32m",
    whiteFg: isBrowser ? "color: white;" : "\x1b[37m",

    reset: isBrowser ? "" : "\x1b[0m"
};

console.success = function(args) {
    if (isBrowser) {
        console.log(`%c ${data.icon} ` + `%c ${args}`, `${data.greenBg} ${data.whiteFg}`, data.greenFg);
    } else {
        console.log(data.greenBg + data.whiteFg, data.icon, data.reset, data.greenFg, ...arguments, data.reset);
    }
};

module.exports = console.success;
