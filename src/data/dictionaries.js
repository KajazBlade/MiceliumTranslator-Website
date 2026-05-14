export const MICELIUM_MAP = {
    "а": "👁",
    "б": "🥌",
    "г": "🚰",
    "е": "✡️",
    "ё": "🔯",
    "ж": "🫟",
    "и": "🫁",
    "к": "🔌",
    "л": "🫛",
    "м": "🪼",
    "н": "👀",
    "о": "🧿",
    "п": "🦷",
    "с": "🗜️",
    "т": "🎚",
    "у": "🫚",
    "х": "🪬",
    "ь": "💺",
    "э": "🍤"
};

export const VOCABULARYWORDS_MAP = {
    "Александр": "*******",
    "Глаз": "🚰🫛🧿🗜️🗜️",
    "Зашквар": "з🪼👁️🚰др",
    "Звук": "з🥌🫚🔌",
    "каджаз": "р👁зр👁🥌🧿🎚ч🫁к",
    "Куплинов": "🔌*р🫛🫁👀🧿в",
    "Мажор": "🗜️🔌ря🚰👁️",
    "Мажоры": "🗜️🔌ря🚰🫁",
    "Мицелиум": "мiцеlium",
    "Мозг": "з🪼🧿🚰",
    "Паук": "Ч🦷🧿🫚🔌",
    "Пес": "🗜️ы🦷",
    "Псы": "🗜️ы🦷ы",
    "Свадьб": "🗜️в👁️🥌д",
    "Свин": "🗜в*👀",
    "Собрание": "🗜️✡️й🪼",
    "Спасибо": "з🪼🧿🚰🫁🪼",
    "Хайп": "др🧿зд",
    "Чувак": "ч🫚вч🧿",
    "Яблок": "з🥌🫛🧿🔌"
};

export const REVERSE_MICELIUM_MAP = Object.fromEntries(
    Object.entries(MICELIUM_MAP).map(([char, emoji]) => [emoji, char])
);

export const REVERSE_VOCABULARYWORDS_MAP = Object.fromEntries(
    Object.entries(VOCABULARYWORDS_MAP).map(([word, translate]) => [translate, word])
);
