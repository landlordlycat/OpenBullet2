export function registerLoliScript(monaco: any) {
    // Register a new language
    monaco.languages.register({ id: 'loliscript' });

    monaco.languages.setLanguageConfiguration('loliscript', {
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        comments: {
            lineComment: "//",
            blockComment: ["/*", "*/"]
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [{
            open: "{",
            close: "}"
        }, {
            open: "[",
            close: "]"
        }, {
            open: "(",
            close: ")"
        }, {
            open: "'",
            close: "'",
            notIn: ["string", "comment"]
        }, {
            open: '"',
            close: '"',
            notIn: ["string", "comment"]
        }],
        surroundingPairs: [{
            open: "{",
            close: "}"
        }, {
            open: "[",
            close: "]"
        }, {
            open: "(",
            close: ")"
        }, {
            open: "<",
            close: ">"
        }, {
            open: "'",
            close: "'"
        }, {
            open: '"',
            close: '"'
        }],
        folding: {
            markers: {
                start: new RegExp("^\\s*#region\\b"),
                end: new RegExp("^\\s*#endregion\\b")
            }
        }
    });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('loliscript', {

        keywords: ["extern", "alias", "using", "bool", "decimal", "sbyte", "byte", "short", "ushort", "int", "uint", "long", "ulong", "char", "float", "double", "object", "dynamic", "string", "assembly", "is", "as", "ref", "out", "this", "base", "new", "typeof", "void", "checked", "unchecked", "default", "delegate", "var", "const", "if", "else", "switch", "case", "while", "do", "for", "foreach", "in", "break", "continue", "goto", "return", "throw", "try", "catch", "finally", "lock", "yield", "from", "let", "where", "join", "on", "equals", "into", "orderby", "ascending", "descending", "select", "group", "by", "namespace", "partial", "class", "field", "event", "method", "param", "property", "public", "protected", "internal", "private", "abstract", "sealed", "static", "struct", "readonly", "volatile", "virtual", "override", "params", "get", "set", "add", "remove", "operator", "true", "false", "implicit", "explicit", "interface", "enum", "null", "async", "await", "fixed", "sizeof", "stackalloc", "unsafe", "nameof", "when",
            "JUMP", "REPEAT", "END", "FOREACH", "IN", "LOG", "CLOG", "WHILE", "IF", "ELSE", "ELSE IF", "TRY", "CATCH", "LOCK", "SET", "TAKE", "TAKEONE", "FROM", "FINALLY", "ACQUIRELOCK", "RELEASELOCK", "MARK", "UNMARK", "USEPROXY", "PROXY"], // Lolicode-specific
        namespaceFollows: ["namespace", "using"],
        parenFollows: ["if", "for", "while", "switch", "foreach", "using", "catch", "when"],
        operators: ["=", "??", "||", "&&", "|", "^", "&", "==", "!=", "<=", ">=", "<<", "+", "-", "*", "/", "%", "!", "~", "++", "--", "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "<<=", ">>=", ">>", "=>"],
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        includeLF: true,
        tokenizer: {
            root: [
                [/^[ \t]*\#\#.*\n/, "comment"],
                [/^[ \t]*\!.*\n/, "disabled"],
                [/\#[^ ]+/, "block.label"],
                [/FUNCTION/, "block.function"],
                [/KEYCHECK/, "block.keycheck"],
                [/KEYCHAIN/, "block.keycheck.keychain"],
                [/(N?M?R?KEY|VALUE)/, "block.keycheck.keychain.key"],
                [/(RECAPTCHA|SOLVECAPTCHA)/, "block.recaptcha"],
                [/REQUEST/, "block.request"],
                [/HEADER/, "block.request.header"],
                [/COOKIE/, "block.request.cookie"],
                [/PARSE/, "block.parse"],
                [/(LR|CSS|JSON|REGEX)/, "block.parse.mode"],
                [/(CAPTCHA|REPORTCAPTCHA)/, "block.captcha"],
                [/TCP/, "block.tcp"],
                [/UTILITY/, "block.utility"],
                [/NAVIGATE/, "block.navigate"],
                [/BROWSERACTION/, "block.browseraction"],
                [/ELEMENTACTION/, "block.elementaction"],
                [/EXECUTEJS/, "block.executejs"],
                [/(IF|ELSE|ENDIF|WHILE|ENDWHILE|JUMP|BEGIN|END|SCRIPT)/, "keyword"],
                [/(PRINT|SET|DELETE)/, "command"],
                [/G?VAR/, "variable"],
                [/CAP/, "capture"],
                [/->/, "arrow"],

                [/\"/, "string", "string"],
                [/[0-9\.]+]/, "number"]
            ],
            string: [
                [/[^\\"<]+/, "string"],
                [/@escapes/, "string.escape"],
                [/<[^"]+>/, "variable"],
                [/\\./, "string.escape.invalid"],
                [/"/, {
                    token: "string.quote",
                    next: "@pop"
                }]
            ],
        }
    });

    // Register the theme
    monaco.editor.defineTheme('vs-dark-loliscript', {
        base: 'vs-dark', // TODO: This could be manually set by the user
        inherit: true,
        colors: {

        },
        rules: [
            { token: 'comment', foreground: '808080' },
            { token: 'disabled', foreground: 'FF6347' },
            { token: 'variable', foreground: 'FFFF00' },
            { token: 'capture', foreground: 'FF6347' },
            { token: 'arrow', foreground: 'FF00FF' },
            { token: 'number', foreground: '8FBC8B' },
            { token: 'string', foreground: 'ADD8E6' },
            { token: 'block.label', foreground: 'FFDAB9' },
            { token: 'block.function', foreground: 'ADFF2F' },
            { token: 'block.keycheck', foreground: '1E90FF' },
            { token: 'block.keycheck.keychain', foreground: 'DDA0DD' },
            { token: 'block.keycheck.keychain.key', foreground: '87CEEB' },
            { token: 'block.recaptcha', foreground: '40E0D0' },
            { token: 'block.request', foreground: '32CD32' },
            { token: 'block.request.header', foreground: 'DDA0DD' },
            { token: 'block.request.cookie', foreground: '87CEEB' },
            { token: 'block.parse', foreground: 'FFD700' },
            { token: 'block.parse.mode', foreground: 'FFA500' },
            { token: 'block.captcha', foreground: 'FF8C00' },
            { token: 'block.tcp', foreground: '9370DB' },
            { token: 'block.utility', foreground: 'F5DEB3' },
            { token: 'block.navigate', foreground: '4169E1' },
            { token: 'block.browseraction', foreground: '008000' },
            { token: 'block.elementaction', foreground: 'B22222' },
            { token: 'block.executejs', foreground: '4B0082' },
            { token: 'keyword', foreground: 'FF4500' },
            { token: 'command', foreground: 'FFA500' },
        ]
    });
}
