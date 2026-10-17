import { Finger, KeyDefinition, KeyboardLayout } from '@/types';

export const FINGER_COLORS: Record<Finger, { bg: string; border: string; text: string; label: string; hand: string }> = {
  'left-pinky': {
    bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    border: 'border-rose-500',
    text: 'text-rose-400',
    label: 'Levý malíček',
    hand: 'Levá ruka',
  },
  'left-ring': {
    bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    border: 'border-amber-500',
    text: 'text-amber-400',
    label: 'Levý prsteníček',
    hand: 'Levá ruka',
  },
  'left-middle': {
    bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    label: 'Levý prostředníček',
    hand: 'Levá ruka',
  },
  'left-index': {
    bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    border: 'border-blue-500',
    text: 'text-blue-400',
    label: 'Levý ukazováček',
    hand: 'Levá ruka',
  },
  'thumb': {
    bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    border: 'border-purple-500',
    text: 'text-purple-400',
    label: 'Palec (levý/pravý)',
    hand: 'Obě ruce',
  },
  'right-index': {
    bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    label: 'Pravý ukazováček',
    hand: 'Pravá ruka',
  },
  'right-middle': {
    bg: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    border: 'border-teal-500',
    text: 'text-teal-400',
    label: 'Pravý prostředníček',
    hand: 'Pravá ruka',
  },
  'right-ring': {
    bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    border: 'border-indigo-500',
    text: 'text-indigo-400',
    label: 'Pravý prsteníček',
    hand: 'Pravá ruka',
  },
  'right-pinky': {
    bg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    border: 'border-pink-500',
    text: 'text-pink-400',
    label: 'Pravý malíček',
    hand: 'Pravá ruka',
  },
};

export const CZECH_KEYBOARD_ROWS: Record<KeyboardLayout, KeyDefinition[][]> = {
  qwertz: [
    // Řada čísel / diakritiky
    [
      { primary: ';', secondary: '°', code: 'Backquote', finger: 'left-pinky' },
      { primary: '+', secondary: '1', code: 'Digit1', finger: 'left-pinky' },
      { primary: 'ě', secondary: '2', code: 'Digit2', finger: 'left-ring' },
      { primary: 'š', secondary: '3', code: 'Digit3', finger: 'left-middle' },
      { primary: 'č', secondary: '4', code: 'Digit4', finger: 'left-index' },
      { primary: 'ř', secondary: '5', code: 'Digit5', finger: 'left-index' },
      { primary: 'ž', secondary: '6', code: 'Digit6', finger: 'right-index' },
      { primary: 'ý', secondary: '7', code: 'Digit7', finger: 'right-index' },
      { primary: 'á', secondary: '8', code: 'Digit8', finger: 'right-middle' },
      { primary: 'í', secondary: '9', code: 'Digit9', finger: 'right-ring' },
      { primary: 'é', secondary: '0', code: 'Digit0', finger: 'right-pinky' },
      { primary: '=', secondary: '%', code: 'Minus', finger: 'right-pinky' },
      { primary: '´', secondary: 'ˇ', code: 'Equal', finger: 'right-pinky' },
      { primary: 'Backspace', code: 'Backspace', finger: 'right-pinky', width: 'w-20' },
    ],
    // Horní řada
    [
      { primary: 'Tab', code: 'Tab', finger: 'left-pinky', width: 'w-16' },
      { primary: 'Q', code: 'KeyQ', finger: 'left-pinky' },
      { primary: 'W', code: 'KeyW', finger: 'left-ring' },
      { primary: 'E', code: 'KeyE', finger: 'left-middle' },
      { primary: 'R', code: 'KeyR', finger: 'left-index' },
      { primary: 'T', code: 'KeyT', finger: 'left-index' },
      { primary: 'Z', code: 'KeyZ', finger: 'right-index' },
      { primary: 'U', code: 'KeyU', finger: 'right-index' },
      { primary: 'I', code: 'KeyI', finger: 'right-middle' },
      { primary: 'O', code: 'KeyO', finger: 'right-ring' },
      { primary: 'P', code: 'KeyP', finger: 'right-pinky' },
      { primary: 'ú', secondary: '/', code: 'BracketLeft', finger: 'right-pinky' },
      { primary: ')', secondary: '(', code: 'BracketRight', finger: 'right-pinky' },
      { primary: 'Enter', code: 'Enter', finger: 'right-pinky', width: 'w-20' },
    ],
    // Domovská řada
    [
      { primary: 'Caps', code: 'CapsLock', finger: 'left-pinky', width: 'w-18' },
      { primary: 'A', code: 'KeyA', finger: 'left-pinky' },
      { primary: 'S', code: 'KeyS', finger: 'left-ring' },
      { primary: 'D', code: 'KeyD', finger: 'left-middle' },
      { primary: 'F', code: 'KeyF', finger: 'left-index' },
      { primary: 'G', code: 'KeyG', finger: 'left-index' },
      { primary: 'H', code: 'KeyH', finger: 'right-index' },
      { primary: 'J', code: 'KeyJ', finger: 'right-index' },
      { primary: 'K', code: 'KeyK', finger: 'right-middle' },
      { primary: 'L', code: 'KeyL', finger: 'right-ring' },
      { primary: 'ů', secondary: '"', code: 'Semicolon', finger: 'right-pinky' },
      { primary: '§', secondary: '!', code: 'Quote', finger: 'right-pinky' },
      { primary: '¨', secondary: "'", code: 'Backslash', finger: 'right-pinky' },
    ],
    // Spodní řada
    [
      { primary: 'Shift', code: 'ShiftLeft', finger: 'left-pinky', width: 'w-22' },
      { primary: 'Y', code: 'KeyY', finger: 'left-pinky' },
      { primary: 'X', code: 'KeyX', finger: 'left-ring' },
      { primary: 'C', code: 'KeyC', finger: 'left-middle' },
      { primary: 'V', code: 'KeyV', finger: 'left-index' },
      { primary: 'B', code: 'KeyB', finger: 'left-index' },
      { primary: 'N', code: 'KeyN', finger: 'right-index' },
      { primary: 'M', code: 'KeyM', finger: 'right-index' },
      { primary: ',', secondary: '?', code: 'Comma', finger: 'right-middle' },
      { primary: '.', secondary: ':', code: 'Period', finger: 'right-ring' },
      { primary: '-', secondary: '_', code: 'Slash', finger: 'right-pinky' },
      { primary: 'Shift', code: 'ShiftRight', finger: 'right-pinky', width: 'w-22' },
    ],
    // Mezerník řada
    [
      { primary: 'Ctrl', code: 'ControlLeft', finger: 'left-pinky', width: 'w-16' },
      { primary: 'Alt', code: 'AltLeft', finger: 'thumb', width: 'w-14' },
      { primary: 'Mezerník', code: 'Space', finger: 'thumb', width: 'w-80 flex-1' },
      { primary: 'Alt Gr', code: 'AltRight', finger: 'thumb', width: 'w-14' },
      { primary: 'Ctrl', code: 'ControlRight', finger: 'right-pinky', width: 'w-16' },
    ],
  ],

  qwerty: [
    // Řada čísel / diakritiky
    [
      { primary: ';', secondary: '°', code: 'Backquote', finger: 'left-pinky' },
      { primary: '+', secondary: '1', code: 'Digit1', finger: 'left-pinky' },
      { primary: 'ě', secondary: '2', code: 'Digit2', finger: 'left-ring' },
      { primary: 'š', secondary: '3', code: 'Digit3', finger: 'left-middle' },
      { primary: 'č', secondary: '4', code: 'Digit4', finger: 'left-index' },
      { primary: 'ř', secondary: '5', code: 'Digit5', finger: 'left-index' },
      { primary: 'ž', secondary: '6', code: 'Digit6', finger: 'right-index' },
      { primary: 'ý', secondary: '7', code: 'Digit7', finger: 'right-index' },
      { primary: 'á', secondary: '8', code: 'Digit8', finger: 'right-middle' },
      { primary: 'í', secondary: '9', code: 'Digit9', finger: 'right-ring' },
      { primary: 'é', secondary: '0', code: 'Digit0', finger: 'right-pinky' },
      { primary: '=', secondary: '%', code: 'Minus', finger: 'right-pinky' },
      { primary: '´', secondary: 'ˇ', code: 'Equal', finger: 'right-pinky' },
      { primary: 'Backspace', code: 'Backspace', finger: 'right-pinky', width: 'w-20' },
    ],
    // Horní řada (Y namísto Z)
    [
      { primary: 'Tab', code: 'Tab', finger: 'left-pinky', width: 'w-16' },
      { primary: 'Q', code: 'KeyQ', finger: 'left-pinky' },
      { primary: 'W', code: 'KeyW', finger: 'left-ring' },
      { primary: 'E', code: 'KeyE', finger: 'left-middle' },
      { primary: 'R', code: 'KeyR', finger: 'left-index' },
      { primary: 'T', code: 'KeyT', finger: 'left-index' },
      { primary: 'Y', code: 'KeyY', finger: 'right-index' },
      { primary: 'U', code: 'KeyU', finger: 'right-index' },
      { primary: 'I', code: 'KeyI', finger: 'right-middle' },
      { primary: 'O', code: 'KeyO', finger: 'right-ring' },
      { primary: 'P', code: 'KeyP', finger: 'right-pinky' },
      { primary: 'ú', secondary: '/', code: 'BracketLeft', finger: 'right-pinky' },
      { primary: ')', secondary: '(', code: 'BracketRight', finger: 'right-pinky' },
      { primary: 'Enter', code: 'Enter', finger: 'right-pinky', width: 'w-20' },
    ],
    // Domovská řada
    [
      { primary: 'Caps', code: 'CapsLock', finger: 'left-pinky', width: 'w-18' },
      { primary: 'A', code: 'KeyA', finger: 'left-pinky' },
      { primary: 'S', code: 'KeyS', finger: 'left-ring' },
      { primary: 'D', code: 'KeyD', finger: 'left-middle' },
      { primary: 'F', code: 'KeyF', finger: 'left-index' },
      { primary: 'G', code: 'KeyG', finger: 'left-index' },
      { primary: 'H', code: 'KeyH', finger: 'right-index' },
      { primary: 'J', code: 'KeyJ', finger: 'right-index' },
      { primary: 'K', code: 'KeyK', finger: 'right-middle' },
      { primary: 'L', code: 'KeyL', finger: 'right-ring' },
      { primary: 'ů', secondary: '"', code: 'Semicolon', finger: 'right-pinky' },
      { primary: '§', secondary: '!', code: 'Quote', finger: 'right-pinky' },
      { primary: '¨', secondary: "'", code: 'Backslash', finger: 'right-pinky' },
    ],
    // Spodní řada (Z namísto Y)
    [
      { primary: 'Shift', code: 'ShiftLeft', finger: 'left-pinky', width: 'w-22' },
      { primary: 'Z', code: 'KeyZ', finger: 'left-pinky' },
      { primary: 'X', code: 'KeyX', finger: 'left-ring' },
      { primary: 'C', code: 'KeyC', finger: 'left-middle' },
      { primary: 'V', code: 'KeyV', finger: 'left-index' },
      { primary: 'B', code: 'KeyB', finger: 'left-index' },
      { primary: 'N', code: 'KeyN', finger: 'right-index' },
      { primary: 'M', code: 'KeyM', finger: 'right-index' },
      { primary: ',', secondary: '?', code: 'Comma', finger: 'right-middle' },
      { primary: '.', secondary: ':', code: 'Period', finger: 'right-ring' },
      { primary: '-', secondary: '_', code: 'Slash', finger: 'right-pinky' },
      { primary: 'Shift', code: 'ShiftRight', finger: 'right-pinky', width: 'w-22' },
    ],
    // Mezerník řada
    [
      { primary: 'Ctrl', code: 'ControlLeft', finger: 'left-pinky', width: 'w-16' },
      { primary: 'Alt', code: 'AltLeft', finger: 'thumb', width: 'w-14' },
      { primary: 'Mezerník', code: 'Space', finger: 'thumb', width: 'w-80 flex-1' },
      { primary: 'Alt Gr', code: 'AltRight', finger: 'thumb', width: 'w-14' },
      { primary: 'Ctrl', code: 'ControlRight', finger: 'right-pinky', width: 'w-16' },
    ],
  ],
};

// Mapování znaku na prst pro rychlé vyhledání
export function getFingerForChar(char: string, layout: KeyboardLayout = 'qwertz'): Finger {
  const c = char.toLowerCase();
  if (c === ' ') return 'thumb';

  const rows = CZECH_KEYBOARD_ROWS[layout];
  for (const row of rows) {
    for (const key of row) {
      if (
        key.primary.toLowerCase() === c ||
        (key.secondary && key.secondary.toLowerCase() === c)
      ) {
        return key.finger;
      }
    }
  }
  return 'thumb';
}
