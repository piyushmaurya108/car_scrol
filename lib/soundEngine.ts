/**
 * Pure Web Audio API synthesized supercar engine sound.
 * No external audio files needed; 100% reliable, zero network latency.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = true;
  private currentRpm: number = 900; // Idle RPM

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Filter to shape raw wave into deep mechanical roar
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Low frequency sub-rumble
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sawtooth";
      this.osc1.frequency.setValueAtTime(38, this.ctx.currentTime);
      this.osc1.connect(this.filter);
      this.osc1.start();

      // Mid harmonics
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "triangle";
      this.osc2.frequency.setValueAtTime(76, this.ctx.currentTime);
      this.osc2.connect(this.filter);
      this.osc2.start();
    } catch {
      // AudioContext unavailable or restricted
    }
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.08;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  /**
   * Modulate engine pitch and filter cutoff dynamically based on car velocity (0..1)
   */
  public updateThrottle(velocity: number) {
    if (!this.ctx || this.isMuted || !this.filter || !this.osc1 || !this.osc2 || !this.masterGain) return;

    const clamped = Math.max(0, Math.min(1, velocity));
    // Base idle 900 RPM -> up to 8500 RPM at high velocity
    this.currentRpm = 900 + clamped * 7600;

    const baseFreq = 35 + clamped * 120;
    const filterFreq = 140 + clamped * 650;
    const gainValue = 0.07 + clamped * 0.12;

    const now = this.ctx.currentTime;
    this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
    this.osc2.frequency.setTargetAtTime(baseFreq * 2.02, now, 0.05);
    this.filter.frequency.setTargetAtTime(filterFreq, now, 0.05);
    this.masterGain.gain.setTargetAtTime(gainValue, now, 0.06);
  }
}

export const soundEngine = typeof window !== "undefined" ? new SoundEngine() : ({} as SoundEngine);
