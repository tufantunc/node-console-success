/* ==========================================================================
   console.success — landing page demo logic
   Runs the REAL console-success library (loaded via unpkg in index.html)
   and mirrors its styled output into the on-page terminal + DevTools console.
   ========================================================================== */
(function () {
    'use strict';

    const inputEl = document.getElementById('demo-input');
    const outputEl = document.getElementById('terminal-output');
    const statusEl = document.getElementById('term-status');
    const runBtn = document.querySelector('[data-action="run"]');
    const clearBtn = document.querySelector('[data-action="clear"]');
    const presets = document.querySelectorAll('[data-preset]');

    /* --- preset templates --- */
    const PRESETS = {
        string: '"Hello world"',
        object: "{ status: 'ok', count: 3 }",
        array: "['a','b','c']",
        number: '42',
        multi: '"Task", "done", true',
        null: 'null'
    };

    /* --- safe-ish value parser ---
       We don't eval arbitrary input. We parse comma-separated JS-like values
       using a tiny expression evaluator limited to: strings, numbers,
       booleans, null, undefined, arrays and plain objects. */
    function parseArgs(raw) {
        const results = [];
        const tokens = splitTopLevel(raw);
        for (const tok of tokens) {
            const t = tok.trim();
            if (!t) continue;
            results.push(evalValue(t));
        }
        return results;
    }

    /* split on commas that are not nested inside [], {} or "" '' */
    function splitTopLevel(str) {
        const out = [];
        let depth = 0, q = null, cur = '';
        for (let i = 0; i < str.length; i++) {
            const c = str[i];
            if (q) {
                cur += c;
                if (c === q && str[i - 1] !== '\\') q = null;
                continue;
            }
            if (c === '"' || c === "'") { q = c; cur += c; continue; }
            if (c === '[' || c === '{') { depth++; cur += c; continue; }
            if (c === ']' || c === '}') { depth--; cur += c; continue; }
            if (c === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
            cur += c;
        }
        if (cur.trim()) out.push(cur);
        return out;
    }

    /* evaluate a single token into a JS value */
    function evalValue(t) {
        // null / undefined / boolean / number
        if (t === 'null') return null;
        if (t === 'undefined') return undefined;
        if (t === 'true') return true;
        if (t === 'false') return false;
        const asNum = Number(t);
        if (t !== '' && !isNaN(asNum)) return asNum;

        // quoted string
        if (/^".*"$/.test(t) || /^'.*'$/.test(t)) {
            return t.slice(1, -1);
        }

        // array
        if (/^\[.*\]$/.test(t)) {
            return splitTopLevel(t.slice(1, -1)).map(x => evalValue(x.trim())).filter(x => x !== '');
        }

        // object { a: 1, b: 'x' }
        if (/^\{.*\}$/.test(t)) {
            const inner = t.slice(1, -1).trim();
            const obj = {};
            if (inner) {
                for (const pair of splitTopLevel(inner)) {
                    const m = pair.match(/^\s*(['"]?)([\w$-]+)\1\s*:\s*(.+)$/);
                    if (m) obj[m[2]] = evalValue(m[3].trim());
                }
            }
            return obj;
        }

        // fallback: treat as plain string
        return t;
    }

    /* --- format a value for on-page display (mirrors browser-mode rendering) --- */
    function formatVal(v) {
        if (v === null) return 'null';
        if (v === undefined) return 'undefined';
        if (typeof v === 'string') return v;
        if (typeof v === 'object') {
            try { return JSON.stringify(v); }
            catch (e) { return '[Circular/Object]'; }
        }
        return String(v);
    }

    /* escape HTML for safe insertion */
    function esc(s) {
        return String(s).replace(/[&<>"']/g, c => (
            { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
        ));
    }

    /* --- run the demo --- */
    function runDemo() {
        const raw = inputEl.value;
        let args;
        try {
            args = parseArgs(raw);
        } catch (e) {
            setStatus('error', true);
            appendLine(`<span class="lo-err">parse error: ${esc(e.message)}</span>`);
            return;
        }

        if (args.length === 0) {
            setStatus('empty');
            return;
        }

        // Mirror the rendered output into the on-page terminal.
        // The library joins browser args with spaces (see src/index.js).
        const joined = args.map(formatVal).join(' ');
        appendLine(`<span class="lo-prompt">❯</span> console.success()`);
        appendLine(
            `<span class="t-success-badge"> ✓ </span> ${esc(joined)}`
        );

        // Also actually call the real console.success so DevTools shows the
        // native styled log (the library applies %c green CSS styling).
        try {
            if (typeof console.success === 'function') {
                console.success.apply(null, args);
            } else {
                appendLine(`<span class="lo-err">⚠ console.success not loaded yet (CDN still fetching). Retry in a moment.</span>`);
            }
        } catch (e) {
            // library side-effects shouldn't break the page
        }

        setStatus('ran');
    }

    function appendLine(html) {
        // remove placeholder on first write
        const ph = outputEl.querySelector('.placeholder');
        if (ph) ph.remove();

        const line = document.createElement('div');
        line.className = 'lo-line';
        line.innerHTML = html;
        outputEl.appendChild(line);
        outputEl.scrollTop = outputEl.scrollHeight;
    }

    function setStatus(state, isError) {
        if (!statusEl) return;
        statusEl.classList.toggle('live', !isError);
        const labels = { idle: 'idle', ran: 'logged ✓', error: 'error', empty: 'no input' };
        statusEl.textContent = labels[state] || state;
    }

    function clearOutput() {
        outputEl.innerHTML = '<p class="placeholder">Output appears here. Hit <kbd>Run</kbd> to call <code>console.success()</code>.</p>';
        setStatus('idle');
    }

    /* --- wiring --- */
    runBtn.addEventListener('click', runDemo);
    clearBtn.addEventListener('click', clearOutput);

    presets.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-preset');
            if (PRESETS[key]) {
                inputEl.value = PRESETS[key];
                inputEl.focus();
            }
        });
    });

    // Ctrl/Cmd+Enter runs the demo
    inputEl.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            runDemo();
        }
    });

    /* --- tabs --- */
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            document.querySelectorAll('.tab').forEach(t => {
                const active = t === tab;
                t.classList.toggle('active', active);
                t.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            document.querySelectorAll('.tab-panel').forEach(p => {
                p.classList.toggle('active', p.getAttribute('data-panel') === target);
            });
        });
    });

    /* --- copy buttons --- */
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(text);
                const orig = btn.textContent;
                btn.textContent = 'copied ✓';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = orig;
                    btn.classList.remove('copied');
                }, 1400);
            } catch (e) {
                btn.textContent = 'press ⌘C';
                setTimeout(() => { btn.textContent = 'copy'; }, 1400);
            }
        });
    });

    /* --- run once on load to show it works immediately --- */
    window.addEventListener('load', () => {
        setTimeout(runDemo, 600);
    });
})();
