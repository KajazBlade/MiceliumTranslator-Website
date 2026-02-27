document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const input = document.getElementById('userInput');
    const output = document.getElementById('outputDisplay');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const copyBtn = document.getElementById('copyBtn');
    const githubBtn = document.getElementById('githubBtn');
    const accentBtn = document.getElementById('accentBtn');

    const problematicWords = ['чувак', 'чувака', 'чуваку', 'чуваком', 'чуваке', 'чуваки', 'чуваков'];

    const showModal = (onTranslateWithProblems, onKeepOriginal) => {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <p>В тексте есть проблемные слова (например, "чувак"), которые пока не полностью поддерживаются. Они скоро будут готовы!</p>
                <div class="modal-actions">
                    <button id="translateWithProblems" class="btn-main">Перевести с проблемами</button>
                    <button id="keepOriginal" class="btn-outline">Оставить в первоначальном виде</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('translateWithProblems').onclick = () => {
            modal.remove();
            onTranslateWithProblems();
        };

        document.getElementById('keepOriginal').onclick = () => {
            modal.remove();
            onKeepOriginal();
        };
    };

    const processTranslation = (isEncoding) => {
        const text = input.value;
        const wordsInInput = text.toLowerCase().split(/\s+/);
        const hasProblem = wordsInInput.some(word => problematicWords.includes(word.replace(/[.,!?;:]/g, '')));

        if (hasProblem) {
            showModal(
                () => {
                    const result = isEncoding ? window.Translator.toMicelium(text) : window.Translator.fromMicelium(text);
                    output.innerText = result;
                },
                () => {
                    const originalWords = text.split(/\s+/);
                    let result = [];

                    originalWords.forEach((word) => {
                        const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
                        if (problematicWords.includes(cleanWord)) {
                            result.push(word);
                        } else {
                            result.push(isEncoding ? window.Translator.toMicelium(word) : window.Translator.fromMicelium(word));
                        }
                    });

                    output.innerText = result.join(' ');
                }
            );
        } else {
            const result = isEncoding ? window.Translator.toMicelium(text) : window.Translator.fromMicelium(text);
            output.innerText = result;
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.querySelector('.icon').innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.onclick = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.querySelector('.icon').innerText = newTheme === 'dark' ? '☀️' : '🌙';
    };

    accentBtn.onclick = () => {
        const isBlue = document.documentElement.getAttribute('data-accent') === 'blue';
        if (isBlue) {
            document.documentElement.removeAttribute('data-accent');
            accentBtn.innerText = '🧿';
        } else {
            document.documentElement.setAttribute('data-accent', 'blue');
            accentBtn.innerText = '🪼';
        }
    };

    encodeBtn.onclick = () => processTranslation(true);
    decodeBtn.onclick = () => processTranslation(false);

    copyBtn.onclick = () => {
        const text = output.innerText;
        if (text && text !== "_") {
            navigator.clipboard.writeText(text);
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "ГОТОВО!";
            setTimeout(() => copyBtn.innerText = originalText, 1500);
        }
    };

    githubBtn.onclick = () => {
        window.open('https://github.com/KajazBlade/MiceliumTranslator', '_blank');
    };
});