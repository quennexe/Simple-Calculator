const display = document.getElementById("display");
const historyDiv = document.getElementById("history");
const soundToggleBtn = document.getElementById("sound-toggle-btn");
const langBtn = document.getElementById("lang-btn");
const clickSound = new Audio('click-sound.mp3.mp3'); // Ses dosyasını kontrol edin

let isSoundOn = true;
let currentLang = "tr";

const texts = {
    tr: {
        copyBtn: "📋 Kopyala",
        themeBtn: "🌗 Tema",
        soundOn: "Ses Açık",
        soundOff: "Ses Kapalı",
        historyHeader: "Geçmiş",
        error: "Hata"
    },
    en: {
        copyBtn: "📋 Copy",
        themeBtn: "🌗 Theme",
        soundOn: "Sound On",
        soundOff: "Sound Off",
        historyHeader: "History",
        error: "Error"
    }
};

// Dil değişiminde metinleri güncelleyen fonksiyon
function updateLanguage() {
    const text = texts[currentLang];
    document.getElementById("copy-btn").textContent = text.copyBtn;
    document.getElementById("sound-toggle-btn").textContent = (isSoundOn) ? text.soundOn : text.soundOff;
    document.getElementById("theme-btn").textContent = text.themeBtn;
    langBtn.textContent = (currentLang === "tr") ? "🇬🇧 English" : "🇹🇷 Türkçe";
}

function appendValue(val) {
    if (isSoundOn) {
        clickSound.play();
    }
    display.value += val;
}

function clearDisplay() {
    if (isSoundOn) {
        clickSound.play();
    }
    display.value = "";
}

function deleteLast() {
    if (isSoundOn) {
        clickSound.play();
    }
    display.value = display.value.slice(0, -1);
}

function calculate() {
    if (isSoundOn) {
        clickSound.play();
    }
    try {
        let expression = display.value.replace(/%/g, "/100");
        let result = eval(expression);
        addToHistory(`${display.value} = ${result}`);
        display.value = result;
    } catch {
        display.value = texts[currentLang].error; // Hata mesajını dildeki "Hata" olarak değiştirir
    }
}

function squareRoot() {
    if (isSoundOn) {
        clickSound.play();
    }
    const val = parseFloat(display.value);
    if (!isNaN(val)) {
        const result = Math.sqrt(val);
        addToHistory(`√${val} = ${result}`);
        display.value = result;
    }
}

function square() {
    if (isSoundOn) {
        clickSound.play();
    }
    const val = parseFloat(display.value);
    if (!isNaN(val)) {
        const result = Math.pow(val, 2);
        addToHistory(`${val}² = ${result}`);
        display.value = result;
    }
}

function toggleSign() {
    if (isSoundOn) {
        clickSound.play();
    }
    const val = parseFloat(display.value);
    if (!isNaN(val)) {
        display.value = -val;
    }
}

function copyResult() {
    if (isSoundOn) {
        clickSound.play();
    }
    navigator.clipboard.writeText(display.value);
    alert((currentLang === "tr") ? "Sonuç panoya kopyalandı!" : "Result copied to clipboard!");
}

function toggleTheme() {
    if (isSoundOn) {
        clickSound.play();
    }
    document.body.classList.toggle("light-mode");
}

function addToHistory(entry) {
    const div = document.createElement("div");
    div.textContent = entry;
    historyDiv.appendChild(div);
    historyDiv.scrollTop = historyDiv.scrollHeight;
}

function appendScientific(func) {
    if (isSoundOn) {
        clickSound.play();
    }
    display.value += func + "(";
}

function toggleSound() {
    isSoundOn = !isSoundOn;
    soundToggleBtn.textContent = isSoundOn ? texts[currentLang].soundOn : texts[currentLang].soundOff;
}

function toggleLanguage() {
    currentLang = (currentLang === "tr") ? "en" : "tr";
    updateLanguage(); // Dil değiştiğinde metinleri güncelle
}

document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!isNaN(key) || "+-*/.%".includes(key)) {
        if (isSoundOn) {
            clickSound.play();
        }
        appendValue(key);
    } else if (key === "Enter") {
        e.preventDefault();
        if (isSoundOn) {
            clickSound.play();
        }
        calculate();
    } else if (key === "Backspace") {
        if (isSoundOn) {
            clickSound.play();
        }
        deleteLast();
    } else if (key === "Delete") {
        if (isSoundOn) {
            clickSound.play();
        }
        clearDisplay();
    }
});

updateLanguage(); // Sayfa yüklenirken doğru dildeki metni set et