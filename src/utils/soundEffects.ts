type SoundCue = 'clue' | 'reveal' | 'warning' | 'solved' | 'click';

class DetectiveAudioEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  public setMuted(muted: boolean): void {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public play(cue: SoundCue): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (cue === 'click') {
      this.tone(ctx, 520, 0.05, now, 'sine', 0.04);
      return;
    }

    if (cue === 'clue') {
      this.tone(ctx, 440, 0.12, now, 'triangle', 0.08);
      this.tone(ctx, 660, 0.18, now + 0.09, 'triangle', 0.08);
      return;
    }

    if (cue === 'reveal') {
      this.tone(ctx, 392, 0.12, now, 'sine', 0.07);
      this.tone(ctx, 523.25, 0.18, now + 0.08, 'sine', 0.08);
      return;
    }

    if (cue === 'warning') {
      this.tone(ctx, 196, 0.22, now, 'sawtooth', 0.06);
      this.tone(ctx, 146.83, 0.3, now + 0.16, 'sawtooth', 0.06);
      return;
    }

    if (cue === 'solved') {
      this.tone(ctx, 261.63, 0.16, now, 'triangle', 0.09);
      this.tone(ctx, 329.63, 0.16, now + 0.1, 'triangle', 0.09);
      this.tone(ctx, 392.0, 0.2, now + 0.2, 'triangle', 0.09);
      this.tone(ctx, 523.25, 0.42, now + 0.3, 'triangle', 0.11);
    }
  }

  private tone(
    ctx: AudioContext,
    freq: number,
    duration: number,
    startTime: number,
    type: OscillatorType,
    gainPeak: number
  ): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }
}

export const audioEngine = new DetectiveAudioEngine();
