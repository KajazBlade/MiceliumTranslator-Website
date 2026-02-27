window.VOCABULARYWORDS_MAP = {
    "Глаз": "🚰л🧿🗜️🗜️",
    "Звук": "звяк",
    "Куплино": "К*рл🫁👀🧿",
    "Мицелиум": "мiцеlium",
    "Мозг": "з🪼🧿🚰",
    "Пес": "🗜️ы🦷",
    "Собак": "🗜️ы🦷п",
    "Свадьб": "🗜️в👁️🥌д",
    "Хайп": "др🧿зд",
    "Чувак": "ч🫚вч🧿",
    "Зашквар": "з🪼👁️🚰др",
    "Яблок": "з🥌л🧿к"
};

window.REVERSE_MAP = Object.fromEntries(
    Object.entries(window.VOCABULARYWORDS_MAP).map(([Word, Translate]) => [Translate, Word])
);