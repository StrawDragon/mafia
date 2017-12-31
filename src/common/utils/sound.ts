// tslint:disable-next-line
const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;

type PlayConfig = {
  startLoop?: number;
  endLoop?: number;
  offset?: number;
  duration?: number;
  loop?: boolean;
};

export class Sound {
  private soundArrayBuffer: ArrayBuffer;
  private context: AudioContext;
  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode;

  constructor(soundArrayBuffer: ArrayBuffer) {
    this.soundArrayBuffer = soundArrayBuffer;
    this.context = new AudioContext();
  }

  init() {
    return this.context.decodeAudioData(this.soundArrayBuffer)
      .then(buffer => this.buffer = buffer);
  }

  play(config?: PlayConfig) {
    const c = config || {};

    this.stop();
    this.source = this.context.createBufferSource();
    this.source.connect(this.context.destination);
    this.source.buffer = this.buffer;
    this.source.loop = c.loop || false;
    this.source.loopStart = c.startLoop || 0;
    this.source.loopEnd = c.endLoop || 0;
    
    this.source.start(0, c.offset || 0, c.duration || undefined);
  }
  stop() {
    if (this.source) {
      this.source.stop();
    }
  }
}