window.Translator = {
    applyAlphabet(text, symbolsMap) {
        return Array.from(text).map(char => {
            const lowChar = char.toLowerCase();
            const mapped = symbolsMap[lowChar];
            if (!mapped) return char;
            return char === char.toUpperCase() && char !== lowChar ? mapped.toUpperCase() : mapped;
        }).join('');
    },

    toMicelium(text) {
        if (!text || !window.VOCABULARYWORDS_MAP || !window.ENDINGS_CONFIG) return text;

        const config = window.ENDINGS_CONFIG;
        const words = Object.keys(window.VOCABULARYWORDS_MAP).sort((a, b) => b.length - a.length);
        let result = text;

        words.forEach(word => {
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord + '([а-яА-ЯёЁ]*)', 'gi');
            
            result = result.replace(regex, (match, ending) => {
                const translation = window.VOCABULARYWORDS_MAP[word];
                let lowEnd = ending.toLowerCase();
                const checkRoot = word.toLowerCase();
                
                if (checkRoot === "свадьб" || checkRoot === "свабд") {
                    lowEnd = lowEnd === 'е' ? 'е' : (config.softEndings[lowEnd] || lowEnd);
                }
                
                return `\uE000${translation}${this.applyAlphabet(lowEnd, config.symbols.to)}\uE001`;
            });
        });

        let finalResult = "";
        let inToken = false;

        for (const char of result) {
            if (char === '\uE000') {
                inToken = true;
            } else if (char === '\uE001') {
                inToken = false;
            } else if (inToken) {
                finalResult += char;
            } else {
                const lowChar = char.toLowerCase();
                const mapped = config.symbols.to[lowChar];
                if (mapped) {
                    finalResult += char === char.toUpperCase() && char !== lowChar ? mapped.toUpperCase() : mapped;
                } else {
                    finalResult += char;
                }
            }
        }

        return finalResult;
    },

    fromMicelium(text) {
        if (!text || !window.REVERSE_MAP || !window.ENDINGS_CONFIG) return text;

        const config = window.ENDINGS_CONFIG;
        const fromMapEntries = Object.entries(config.symbols.from).sort((a, b) => b[0].length - a[0].length);
        let decodedText = "";

        for (let i = 0; i < text.length;) {
            const match = fromMapEntries.find(([sym]) => text.startsWith(sym, i));
            if (match) {
                decodedText += match[1];
                i += match[0].length;
            } else {
                decodedText += text[i];
                i++;
            }
        }

        const codes = Object.keys(window.REVERSE_MAP).sort((a, b) => b.length - a.length);
        let finalResult = decodedText;

        codes.forEach(code => {
            const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedCode + '([а-яА-ЯёЁ]*)', 'gi');
            
            finalResult = finalResult.replace(regex, (match, ending) => {
                const originalRoot = window.REVERSE_MAP[code];
                let lowEnd = ending.toLowerCase();
                const checkRoot = originalRoot.toLowerCase();
                
                if ((checkRoot === "свадьб" || checkRoot === "свабд") && lowEnd !== 'е') {
                    lowEnd = config.hardEndings[lowEnd] || lowEnd;
                }
                
                return originalRoot + lowEnd;
            });
        });

        return finalResult;
    }
};