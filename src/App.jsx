import React, { useState, useEffect, useRef, useCallback } from 'react';

// Translations for i18n support
const translations = {
  en: {
    title: 'Page Runner',
    subtitle: 'Speed Reading with Optimal Recognition Point',
    placeholder: 'Paste your text here to begin reading...',
    play: 'Play',
    pause: 'Pause',
    reset: 'Reset',
    wpm: 'Words per minute',
    progress: 'Progress',
    settings: 'Settings',
    appearance: 'Appearance',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    custom: 'Custom',
    focusPoint: 'Focus Point',
    enableORP: 'Highlight focus letter',
    focusColor: 'Focus color',
    textColor: 'Text color',
    bgColor: 'Background color',
    language: 'Language',
    wordCount: 'words',
    timeEstimate: 'min read at current speed',
    ready: 'Ready to read',
    reading: 'Reading...',
    finished: 'Finished!',
    instructions: 'Enter text above and press Play to start speed reading',
    hideInput: 'Hide Input',
    showInput: 'Show Input',
    loadFile: 'Load .txt file',
    fullscreen: 'Fullscreen',
  },
  es: {
    title: 'Page Runner',
    subtitle: 'Lectura rápida con punto de reconocimiento óptimo',
    placeholder: 'Pega tu texto aquí para comenzar a leer...',
    play: 'Reproducir',
    pause: 'Pausar',
    reset: 'Reiniciar',
    wpm: 'Palabras por minuto',
    progress: 'Progreso',
    settings: 'Configuración',
    appearance: 'Apariencia',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    custom: 'Personalizado',
    focusPoint: 'Punto de enfoque',
    enableORP: 'Resaltar letra de enfoque',
    focusColor: 'Color de enfoque',
    textColor: 'Color del texto',
    bgColor: 'Color de fondo',
    language: 'Idioma',
    wordCount: 'palabras',
    timeEstimate: 'min de lectura a velocidad actual',
    ready: 'Listo para leer',
    reading: 'Leyendo...',
    finished: '¡Terminado!',
    instructions: 'Ingresa texto arriba y presiona Reproducir para comenzar',
    hideInput: 'Ocultar entrada',
    showInput: 'Mostrar entrada',
    loadFile: 'Cargar .txt',
    fullscreen: 'Pantalla completa',
  },
  pt: {
    title: 'Page Runner',
    subtitle: 'Leitura rápida com ponto de reconhecimento ótimo',
    placeholder: 'Cole o seu texto aqui para começar a ler...',
    play: 'Reproduzir',
    pause: 'Pausar',
    reset: 'Reiniciar',
    wpm: 'Palavras por minuto',
    progress: 'Progresso',
    settings: 'Configurações',
    appearance: 'Aparência',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    custom: 'Personalizado',
    focusPoint: 'Ponto de foco',
    enableORP: 'Destacar letra de foco',
    focusColor: 'Cor do foco',
    textColor: 'Cor do texto',
    bgColor: 'Cor do fundo',
    language: 'Idioma',
    wordCount: 'palavras',
    timeEstimate: 'min de leitura na velocidade atual',
    ready: 'Pronto para ler',
    reading: 'Lendo...',
    finished: 'Terminado!',
    instructions: 'Digite o texto acima e pressione Reproduzir para começar',
    hideInput: 'Ocultar entrada',
    showInput: 'Mostrar entrada',
    loadFile: 'Carregar .txt',
    fullscreen: 'Tela cheia',
  },
  lv: {
    title: 'Page Runner',
    subtitle: 'Ātrā lasīšana ar optimālo atpazīšanas punktu',
    placeholder: 'Ielīmējiet tekstu šeit, lai sāktu lasīt...',
    play: 'Atskaņot',
    pause: 'Pauze',
    reset: 'Atiestatīt',
    wpm: 'Vārdi minūtē',
    progress: 'Progress',
    settings: 'Iestatījumi',
    appearance: 'Izskats',
    theme: 'Tēma',
    light: 'Gaišs',
    dark: 'Tumšs',
    custom: 'Pielāgots',
    focusPoint: 'Fokusa punkts',
    enableORP: 'Izcelt fokusa burtu',
    focusColor: 'Fokusa krāsa',
    textColor: 'Teksta krāsa',
    bgColor: 'Fona krāsa',
    language: 'Valoda',
    wordCount: 'vārdi',
    timeEstimate: 'min lasīšana pašreizējā ātrumā',
    ready: 'Gatavs lasīt',
    reading: 'Lasu...',
    finished: 'Pabeigts!',
    instructions: 'Ievadiet tekstu augšā un nospiediet Atskaņot, lai sāktu',
    hideInput: 'Paslēpt ievadi',
    showInput: 'Rādīt ievadi',
    loadFile: 'Ielādēt .txt',
    fullscreen: 'Pilnekrāns',
  },
  de: {
    title: 'Page Runner',
    subtitle: 'Schnelllesen mit optimalem Erkennungspunkt',
    placeholder: 'Fügen Sie hier Ihren Text ein, um mit dem Lesen zu beginnen...',
    play: 'Abspielen',
    pause: 'Pause',
    reset: 'Zurücksetzen',
    wpm: 'Wörter pro Minute',
    progress: 'Fortschritt',
    settings: 'Einstellungen',
    appearance: 'Aussehen',
    theme: 'Thema',
    light: 'Hell',
    dark: 'Dunkel',
    custom: 'Benutzerdefiniert',
    focusPoint: 'Fokuspunkt',
    enableORP: 'Fokusbuchstabe hervorheben',
    focusColor: 'Fokusfarbe',
    textColor: 'Textfarbe',
    bgColor: 'Hintergrundfarbe',
    language: 'Sprache',
    wordCount: 'Wörter',
    timeEstimate: 'Min. Lesezeit bei aktueller Geschwindigkeit',
    ready: 'Bereit zum Lesen',
    reading: 'Lese...',
    finished: 'Fertig!',
    instructions: 'Text oben eingeben und Play drücken zum Starten',
    hideInput: 'Eingabe ausblenden',
    showInput: 'Eingabe anzeigen',
    loadFile: '.txt laden',
    fullscreen: 'Vollbild',
  },
  fr: {
    title: 'Page Runner',
    subtitle: 'Lecture rapide avec point de reconnaissance optimal',
    placeholder: 'Collez votre texte ici pour commencer à lire...',
    play: 'Lecture',
    pause: 'Pause',
    reset: 'Réinitialiser',
    wpm: 'Mots par minute',
    progress: 'Progression',
    settings: 'Paramètres',
    appearance: 'Apparence',
    theme: 'Thème',
    light: 'Clair',
    dark: 'Sombre',
    custom: 'Personnalisé',
    focusPoint: 'Point de focus',
    enableORP: 'Surligner la lettre de focus',
    focusColor: 'Couleur du focus',
    textColor: 'Couleur du texte',
    bgColor: 'Couleur de fond',
    language: 'Langue',
    wordCount: 'mots',
    timeEstimate: 'min de lecture à la vitesse actuelle',
    ready: 'Prêt à lire',
    reading: 'Lecture en cours...',
    finished: 'Terminé !',
    instructions: 'Entrez le texte ci-dessus et appuyez sur Lecture pour commencer',
    hideInput: 'Masquer entrée',
    showInput: 'Afficher entrée',
    loadFile: 'Charger .txt',
    fullscreen: 'Plein écran',
  },
};

// Calculate the Optimal Recognition Point (ORP) for a word
// The ORP letter must always appear at the exact center line
// Based on the original Spritz/Bionic reading research
const calculateORP = (word) => {
  const len = word.length;
  if (len === 1) return 0;     // 1 letter: index 0
  if (len === 2) return 0;     // 2 letters: index 0 (1st letter)
  if (len === 3) return 1;     // 3 letters: index 1 (2nd/middle letter)
  if (len === 4) return 1;     // 4 letters: index 1 (2nd letter)
  if (len === 5) return 1;     // 5 letters: index 1 (2nd letter)
  if (len <= 7) return 2;      // 6-7 letters: index 2 (3rd letter)
  if (len <= 9) return 3;      // 8-9 letters: index 3 (4th letter)
  if (len <= 11) return 3;     // 10-11 letters: index 3 (4th letter)
  if (len <= 13) return 4;     // 12-13 letters: index 4 (5th letter)
  return Math.floor(len * 0.3); // Longer words: ~30% in
};

// Calculate delay multiplier for punctuation and long words
const getDelayMultiplier = (word) => {
  let multiplier = 1;
  // Add pause for punctuation
  if (/[.!?]$/.test(word)) multiplier = 2.5;
  else if (/[,;:]$/.test(word)) multiplier = 1.5;
  else if (/[-–—]$/.test(word)) multiplier = 1.3;
  // Add slight pause for longer words
  if (word.length > 10) multiplier *= 1.2;
  return multiplier;
};

// Theme presets
const themes = {
  light: {
    bg: '#f5f3ef',
    text: '#1a1a1a',
    displayBg: '#ffffff',
    displayText: '#0d0d0d',
    accent: '#e63946',
    border: '#d4d0c8',
    muted: '#6b6b6b',
  },
  dark: {
    bg: '#0d0d0d',
    text: '#e8e6e3',
    displayBg: '#1a1a1a',
    displayText: '#ffffff',
    accent: '#e63946',
    border: '#2a2a2a',
    muted: '#888888',
  },
};

export default function PageRunner() {
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const [theme, setTheme] = useState('dark');
  const [showORP, setShowORP] = useState(true);
  const [focusColor, setFocusColor] = useState('#e63946');
  const [customColors, setCustomColors] = useState({
    bg: '#1a1a1a',
    text: '#ffffff',
  });
  const [language, setLanguage] = useState('en');
  const [showSettings, setShowSettings] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const timerRef = useRef(null);
  const isPlayingRef = useRef(isPlaying);
  const currentIndexRef = useRef(currentIndex);
  const wordsRef = useRef(words);
  const wpmRef = useRef(wpm);

  const t = translations[language];

  // Keep refs in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    wpmRef.current = wpm;
  }, [wpm]);

  // Parse text into words
  useEffect(() => {
    const parsed = text.trim().split(/\s+/).filter(w => w.length > 0);
    setWords(parsed);
    setCurrentIndex(0);
  }, [text]);

  // Stable playback function using refs
  const scheduleNextWord = useCallback(() => {
    const currentIdx = currentIndexRef.current;
    const currentWords = wordsRef.current;
    const currentWpm = wpmRef.current;

    const currentWord = currentWords[currentIdx];
    const baseDelay = 60000 / currentWpm;
    const delay = baseDelay * getDelayMultiplier(currentWord);

    timerRef.current = setTimeout(() => {
      if (isPlayingRef.current) {
        setCurrentIndex(prev => prev + 1);
      }
    }, delay);
  }, []);

  // Simple effect to start/stop playback
  useEffect(() => {
    if (isPlaying && words.length > 0) {
      if (currentIndex >= words.length - 1) {
        // Reached the end, stop playing
        setIsPlaying(false);
      } else {
        scheduleNextWord();
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, currentIndex, scheduleNextWord, words.length]);

  const handlePlay = () => {
    if (words.length === 0) return;
    if (currentIndex >= words.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only accept .txt files
    if (!file.name.endsWith('.txt')) {
      alert('Please upload a .txt file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setText(content);
        setShowInput(true); // Show input so user can see the loaded text
      }
    };
    reader.readAsText(file);
  };

  const handleTextClick = (e) => {
    if (isPlaying) return; // Don't allow jumping while playing

    const textarea = e.target;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPosition);
    const wordsBeforeCursor = textBeforeCursor.trim().split(/\s+/).filter(w => w.length > 0);
    const wordIndex = Math.max(0, wordsBeforeCursor.length - 1);

    if (wordIndex < words.length) {
      setCurrentIndex(wordIndex);
    }
  };

  // Get current colors based on theme
  const getColors = () => {
    if (theme === 'custom') {
      return {
        ...themes.dark,
        displayBg: customColors.bg,
        displayText: customColors.text,
      };
    }
    return themes[theme];
  };

  const colors = getColors();
  // ORP color is always red for light/dark themes, custom in custom theme
  const orpColor = theme === 'custom' ? focusColor : '#e63946';
  const currentWord = words[currentIndex] || '';
  const orpIndex = calculateORP(currentWord);
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0;
  const timeEstimate = words.length > 0 ? (words.length / wpm).toFixed(1) : 0;

  // Render word split into three parts: before ORP, ORP letter, after ORP
  // This allows CSS Grid to perfectly center the ORP letter
  const renderWord = () => {
    if (!currentWord) return null;
    
    const before = currentWord.substring(0, orpIndex);
    const orp = currentWord[orpIndex] || '';
    const after = currentWord.substring(orpIndex + 1);
    
    return (
      <>
        <span className="word-before">{before}</span>
        <span
          className="word-orp"
          style={{ color: showORP ? orpColor : colors.displayText }}
        >
          {orp}
        </span>
        <span className="word-after">{after}</span>
      </>
    );
  };

  // Render fullscreen mode
  if (isFullscreen) {
    return (
      <div
        className="fullscreen-overlay"
        style={{
          '--bg': colors.bg,
          '--text': colors.text,
          '--display-bg': colors.displayBg,
          '--display-text': colors.displayText,
          '--accent': colors.accent,
          '--orp-color': orpColor,
          '--border': colors.border,
          '--muted': colors.muted,
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600&display=swap');

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          .fullscreen-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--display-bg);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
          }

          .fullscreen-exit {
            position: absolute;
            top: 2rem;
            right: 2rem;
            width: 48px;
            height: 48px;
            background: transparent;
            border: 2px solid var(--border);
            border-radius: 50%;
            color: var(--text);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            transition: all 0.2s ease;
          }

          .fullscreen-exit:hover {
            border-color: var(--accent);
            color: var(--accent);
          }

          .fullscreen-display {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 1200px;
          }

          .word-wrapper {
            display: grid;
            grid-template-columns: 1fr auto 3fr;
            align-items: center;
            width: 100%;
            max-width: 95%;
            font-family: 'Roboto Mono', monospace;
            font-size: clamp(2rem, 8vw, 5rem);
            font-weight: 400;
            letter-spacing: 0.02em;
            white-space: nowrap;
          }

          .word-before {
            text-align: right;
            color: var(--display-text);
          }

          .word-orp {
            text-align: center;
            position: relative;
          }

          .word-orp::before,
          .word-orp::after {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 3px;
            height: 0.5em;
            background: var(--orp-color);
            opacity: 0.5;
          }

          .word-orp::before {
            top: -0.7em;
          }

          .word-orp::after {
            bottom: -0.7em;
          }

          .word-after {
            text-align: left;
            color: var(--display-text);
          }

          .fullscreen-controls {
            width: 100%;
            max-width: 600px;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 2rem;
          }

          .fullscreen-wpm {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .fullscreen-wpm-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9rem;
            color: var(--muted);
          }

          .fullscreen-wpm-value {
            font-variant-numeric: tabular-nums;
            font-weight: 600;
            color: var(--orp-color);
            font-size: 1rem;
          }

          .slider {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: var(--border);
            cursor: pointer;
          }

          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--orp-color);
            cursor: pointer;
            transition: transform 0.2s ease;
          }

          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }

          .fullscreen-button {
            width: 100%;
            padding: 1.25rem;
            border: none;
            border-radius: 12px;
            background: var(--orp-color);
            color: white;
            font-family: 'DM Sans', system-ui, sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            transition: all 0.2s ease;
          }

          .fullscreen-button:hover {
            filter: brightness(1.1);
          }
        `}</style>

        <button className="fullscreen-exit" onClick={() => setIsFullscreen(false)}>
          ✕
        </button>

        <div className="fullscreen-display">
          {currentWord ? (
            <div className="word-wrapper">
              {renderWord()}
            </div>
          ) : null}
        </div>

        <div className="fullscreen-controls">
          <div className="fullscreen-wpm">
            <div className="fullscreen-wpm-header">
              <span>{t.wpm}</span>
              <span className="fullscreen-wpm-value">{wpm}</span>
            </div>
            <input
              type="range"
              className="slider"
              min="100"
              max="1000"
              step="25"
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
            />
          </div>

          {!isPlaying ? (
            <button className="fullscreen-button" onClick={handlePlay} disabled={words.length === 0}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              {t.play}
            </button>
          ) : (
            <button className="fullscreen-button" onClick={handlePause}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
              {t.pause}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="page-runner"
      style={{
        '--bg': colors.bg,
        '--text': colors.text,
        '--display-bg': colors.displayBg,
        '--display-text': colors.displayText,
        '--accent': colors.accent,
        '--orp-color': orpColor,
        '--border': colors.border,
        '--muted': colors.muted,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .page-runner {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', system-ui, sans-serif;
          padding: 1.5rem;
          transition: background 0.3s ease, color 0.3s ease;
        }
        
        .container {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .title {
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }
        
        .subtitle {
          font-size: 0.875rem;
          color: var(--muted);
          font-weight: 400;
        }
        
        .input-section {
          margin-bottom: 1.5rem;
        }

        .input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .input-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: transparent;
          color: var(--text);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .input-toggle-btn:hover {
          border-color: var(--accent);
        }

        .input-toggle-btn svg {
          transition: transform 0.2s ease;
        }

        .input-toggle-btn.collapsed svg {
          transform: rotate(180deg);
        }

        .text-input {
          width: 100%;
          min-height: 120px;
          padding: 1rem;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--display-bg);
          color: var(--display-text);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1rem;
          line-height: 1.6;
          resize: vertical;
          transition: border-color 0.2s ease, background 0.3s ease;
        }
        
        .text-input:focus {
          outline: none;
          border-color: var(--accent);
        }
        
        .text-input::placeholder {
          color: var(--muted);
        }
        
        .stats {
          display: flex;
          gap: 1.5rem;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: var(--muted);
        }
        
        .display-section {
          position: relative;
          background: var(--display-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 3rem 1rem;
          margin-bottom: 1.5rem;
          overflow: visible;
          transition: background 0.3s ease;
        }
        
        .word-display {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 120px;
          position: relative;
          overflow: hidden;
        }
        
        .word-wrapper {
          display: grid;
          grid-template-columns: 1fr auto 3fr;
          align-items: center;
          width: 100%;
          max-width: 95%;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(1.75rem, 5vw, 3.5rem);
          font-weight: 400;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }
        
        .word-before {
          text-align: right;
          color: var(--display-text);
        }
        
        .word-orp {
          text-align: center;
          position: relative;
        }

        .word-orp::before,
        .word-orp::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 0.5em;
          background: var(--orp-color);
          opacity: 0.5;
        }

        .word-orp::before {
          top: -0.7em;
        }

        .word-orp::after {
          bottom: -0.7em;
        }
        
        .word-after {
          text-align: left;
          color: var(--display-text);
        }
        
        .placeholder-text {
          color: var(--muted);
          font-size: 1.1rem;
          text-align: center;
        }

        .finished-badge {
          position: absolute;
          bottom: 1rem;
          right: 1.5rem;
          font-size: 0.875rem;
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          background: var(--orp-color);
          color: white;
          font-weight: 500;
        }

        .controls-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .button-row {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }

        .button-row-desktop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
        }

        .button-group {
          display: flex;
          gap: 0.75rem;
        }
        
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--display-bg);
          color: var(--text);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn:hover {
          border-color: var(--accent);
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .btn.primary {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
        
        .btn.primary:hover {
          filter: brightness(1.1);
        }
        
        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }
        
        .slider-value {
          font-variant-numeric: tabular-nums;
          font-weight: 600;
          color: var(--accent);
        }
        
        .slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--border);
          cursor: pointer;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        
        .progress-bar {
          width: 100%;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: var(--accent);
          transition: width 0.1s ease;
        }
        
        .settings-toggle {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
        
        .settings-panel {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background: var(--display-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
        }
        
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        .setting-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .setting-label {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
        }
        
        .theme-buttons {
          display: flex;
          gap: 0.5rem;
        }
        
        .theme-btn {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: transparent;
          color: var(--text);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .theme-btn.active {
          border-color: var(--accent);
          background: var(--accent);
          color: white;
        }
        
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        
        .toggle-label {
          font-size: 0.9rem;
        }
        
        .toggle {
          position: relative;
          width: 48px;
          height: 26px;
          background: var(--border);
          border-radius: 13px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .toggle.active {
          background: var(--accent);
        }
        
        .toggle::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s ease;
        }
        
        .toggle.active::after {
          transform: translateX(22px);
        }
        
        .color-input-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .color-picker {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          overflow: hidden;
        }
        
        .color-picker::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        
        .color-picker::-webkit-color-swatch {
          border: none;
          border-radius: 8px;
        }
        
        .color-value {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          color: var(--muted);
        }
        
        .language-select {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--display-bg);
          color: var(--text);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
        }
        
        .custom-colors {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        .footer {
          text-align: center;
          margin-top: 3rem;
          padding: 1rem;
          font-size: 0.65rem;
          color: var(--muted);
          opacity: 0.7;
        }

        .footer a {
          color: var(--muted);
          text-decoration: none;
        }

        .footer a:hover {
          color: var(--accent);
        }

        .fullscreen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--display-bg);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .fullscreen-exit {
          position: absolute;
          top: 2rem;
          right: 2rem;
          width: 48px;
          height: 48px;
          background: transparent;
          border: 2px solid var(--border);
          border-radius: 50%;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.2s ease;
        }

        .fullscreen-exit:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .fullscreen-display {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 1200px;
        }

        .fullscreen-controls {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
        }

        .fullscreen-wpm {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .fullscreen-wpm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: var(--muted);
        }

        .fullscreen-wpm-value {
          font-variant-numeric: tabular-nums;
          font-weight: 600;
          color: var(--orp-color);
          font-size: 1rem;
        }

        .fullscreen-button {
          width: 100%;
          padding: 1.25rem;
          border: none;
          border-radius: 12px;
          background: var(--orp-color);
          color: white;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.2s ease;
        }

        .fullscreen-button:hover {
          filter: brightness(1.1);
        }

        @media (min-width: 601px) {
          .button-row {
            display: none;
          }

          .settings-toggle {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .page-runner {
            padding: 1rem;
          }

          .display-section {
            padding: 2rem 0.5rem;
          }

          .word-wrapper {
            max-width: 98%;
            font-size: clamp(1.5rem, 4.5vw, 3rem);
          }

          .button-row-desktop {
            display: none;
          }

          .settings-grid {
            grid-template-columns: 1fr;
          }

          .button-row {
            flex-wrap: wrap;
          }

          .btn {
            flex: 1;
            min-width: 100px;
          }
        }
      `}</style>

      <div className="container">
        <header className="header">
          <h1 className="title">{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </header>

        <section className="input-section">
          <div className="input-header">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <label className="input-toggle-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                {t.loadFile}
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                className={`input-toggle-btn ${!showInput ? 'collapsed' : ''}`}
                onClick={() => setShowInput(!showInput)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
                {showInput ? t.hideInput : t.showInput}
              </button>
            </div>
          </div>
          {showInput && (
            <>
              <textarea
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onClick={handleTextClick}
                placeholder={t.placeholder}
                disabled={isPlaying}
              />
              <div className="stats">
                <span>{words.length} {t.wordCount}</span>
                {words.length > 0 && <span>~{timeEstimate} {t.timeEstimate}</span>}
              </div>
            </>
          )}
        </section>

        <section className="display-section">
          <div className="word-display">
            {currentWord ? (
              <div className="word-wrapper">
                {renderWord()}
              </div>
            ) : (
              <p className="placeholder-text">{t.instructions}</p>
            )}
          </div>

          {!isPlaying && currentIndex >= words.length - 1 && words.length > 0 && (
            <span className="finished-badge">{t.finished}</span>
          )}
        </section>

        <section className="controls-section">
          <div className="slider-group">
            <div className="slider-header">
              <span>{t.wpm}</span>
              <span className="slider-value">{wpm}</span>
            </div>
            <input
              type="range"
              className="slider"
              min="100"
              max="1000"
              step="25"
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
            />
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span>{t.progress}</span>
              <span className="slider-value">{currentIndex + 1} / {words.length || 0}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Desktop button layout */}
          <div className="button-row-desktop">
            {!isPlaying ? (
              <button className="btn primary" onClick={handlePlay} disabled={words.length === 0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {t.play}
              </button>
            ) : (
              <button className="btn primary" onClick={handlePause}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
                {t.pause}
              </button>
            )}

            <div className="button-group">
              <button className="btn" onClick={handleReset} disabled={currentIndex === 0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                </svg>
                {t.reset}
              </button>
              <button
                className="btn"
                onClick={() => setIsFullscreen(true)}
                disabled={words.length === 0}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
                {t.fullscreen}
              </button>
              <button
                className="btn"
                onClick={() => setShowSettings(!showSettings)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
                {t.settings}
              </button>
            </div>
          </div>

          {/* Mobile button layout */}
          <div className="button-row">
            {!isPlaying ? (
              <button className="btn primary" onClick={handlePlay} disabled={words.length === 0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {t.play}
              </button>
            ) : (
              <button className="btn primary" onClick={handlePause}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
                {t.pause}
              </button>
            )}
            <button className="btn" onClick={handleReset} disabled={currentIndex === 0}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
              {t.reset}
            </button>
            <button
              className="btn"
              onClick={() => setIsFullscreen(true)}
              disabled={words.length === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
              {t.fullscreen}
            </button>
            <button
              className="btn"
              onClick={() => setShowSettings(!showSettings)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              </svg>
              {t.settings}
            </button>
          </div>

          {showSettings && (
            <div className="settings-panel">
              <div className="settings-grid">
                <div className="setting-group">
                  <span className="setting-label">{t.theme}</span>
                  <div className="theme-buttons">
                    <button 
                      className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => setTheme('light')}
                    >
                      {t.light}
                    </button>
                    <button 
                      className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => setTheme('dark')}
                    >
                      {t.dark}
                    </button>
                    <button 
                      className={`theme-btn ${theme === 'custom' ? 'active' : ''}`}
                      onClick={() => setTheme('custom')}
                    >
                      {t.custom}
                    </button>
                  </div>
                  
                  {theme === 'custom' && (
                    <div className="custom-colors">
                      <div className="color-input-row">
                        <input
                          type="color"
                          className="color-picker"
                          value={customColors.bg}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, bg: e.target.value }))}
                        />
                        <span className="toggle-label">{t.bgColor}</span>
                      </div>
                      <div className="color-input-row">
                        <input
                          type="color"
                          className="color-picker"
                          value={customColors.text}
                          onChange={(e) => setCustomColors(prev => ({ ...prev, text: e.target.value }))}
                        />
                        <span className="toggle-label">{t.textColor}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="setting-group">
                  <span className="setting-label">{t.focusPoint}</span>
                  <div className="toggle-row">
                    <span className="toggle-label">{t.enableORP}</span>
                    <div
                      className={`toggle ${showORP ? 'active' : ''}`}
                      onClick={() => setShowORP(!showORP)}
                    />
                  </div>
                  {showORP && theme === 'custom' && (
                    <div className="color-input-row">
                      <input
                        type="color"
                        className="color-picker"
                        value={focusColor}
                        onChange={(e) => setFocusColor(e.target.value)}
                      />
                      <span className="toggle-label">{t.focusColor}</span>
                    </div>
                  )}
                </div>

                <div className="setting-group">
                  <span className="setting-label">{t.language}</span>
                  <select
                    className="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="pt">Português</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                    <option value="lv">Latviešu</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </section>

        <footer className="footer">
          Made by <a href="https://emilblum.com" target="_blank" rel="noopener noreferrer">Emil Blum</a> &amp; Claude AI for the love of Spritz and the work of Frank Waldman
        </footer>
      </div>
    </div>
  );
}
