import { useState, useCallback, useRef, useEffect } from 'react';

const TARGET_FREQUENCY = 96.5;   // MHz — the "correct" station
const FREQ_MIN = 88;
const FREQ_MAX = 108;
const LOCK_THRESHOLD = 0.8; // signal strength must exceed this to lock

export interface SignalState {
  frequency: number;           // 88–108 MHz
  signalStrength: number;      // 0–1
  snr: number;                 // dB
  isLocked: boolean;
  setFrequency: (f: number) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleWheel: (e: WheelEvent) => void;
  targetFrequency: typeof TARGET_FREQUENCY;
  freqMin: typeof FREQ_MIN;
  freqMax: typeof FREQ_MAX;
}

export function useSignalTuner(): SignalState {
  const [frequency, setFrequencyState] = useState(88);
  const [signalStrength, setSignalStrength] = useState(0);
  const [snr, setSnr] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const freqRef = useRef(88);

  const computeSignal = useCallback((freq: number) => {
    const distance = Math.abs(freq - TARGET_FREQUENCY);
    const range = 4; // how many MHz of "reach"
    const raw = Math.max(0, 1 - distance / range);
    // Sharpen the curve so it peaks tightly
    const strength = Math.pow(raw, 2.5);
    const db = strength > 0 ? Math.round(-90 + strength * 90) : -90;
    return { strength, db };
  }, []);

  const setFrequency = useCallback((f: number) => {
    const clamped = Math.min(FREQ_MAX, Math.max(FREQ_MIN, f));
    freqRef.current = clamped;
    setFrequencyState(clamped);
    const { strength, db } = computeSignal(clamped);
    setSignalStrength(strength);
    setSnr(db);
    setIsLocked(strength >= LOCK_THRESHOLD);
  }, [computeSignal]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;          // 0→1
    const freq = FREQ_MIN + x * (FREQ_MAX - FREQ_MIN);
    setFrequency(parseFloat(freq.toFixed(1)));
  }, [setFrequency]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.1 : -0.1;
    setFrequency(parseFloat((freqRef.current + delta).toFixed(1)));
  }, [setFrequency]);

  return {
    frequency,
    signalStrength,
    snr,
    isLocked,
    setFrequency,
    handleMouseMove,
    handleWheel,
    targetFrequency: TARGET_FREQUENCY,
    freqMin: FREQ_MIN,
    freqMax: FREQ_MAX,
  };
}
