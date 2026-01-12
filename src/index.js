const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const data = {
    icon: '\u2713',

    greenBg: isBrowser ? "background-color: green;" : "\x1b[42m",
    greenFg: isBrowser ? "color: green;" : "\x1b[32m",
    whiteFg: isBrowser ? "color: white;" : "\x1b[37m",

    reset: isBrowser ? "" : "\x1b[0m"
};

const successFunction = function(...args) {
    if (isBrowser) {
        const argsArray = args.map(arg => {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            if (typeof arg === 'object') {
                try {
                    return JSON.stringify(arg);
                } catch (e) {
                    return '[Circular/Object]';
                }
            }
            return String(arg);
        });
        console.log(`%c ${data.icon} ` + `%c ${argsArray.join(' ')}`, `${data.greenBg} ${data.whiteFg}`, data.greenFg);
    } else {
        console.log(data.greenBg + data.whiteFg, data.icon, data.reset, data.greenFg, ...args, data.reset);
    }
};

// Assign to console.success
console.success = successFunction;

// For browser environments, also make it available globally
if (isBrowser && typeof window !== 'undefined') {
    window.consoleSuccess = successFunction;
}

// Export for module systems
export default successFunction;
