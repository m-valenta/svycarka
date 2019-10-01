import { IDisposable } from "bobril";

export class AnimationHandler implements IDisposable {
  private handlers: (() => void)[] = [];
  private intrevalId?: number;
  private canHandle: boolean = false;

  registerHandler(onTick: () => void) {
    this.canHandle = true;
    this.handlers.push(onTick);
  }

  unregisterHandler(onTick: () => void) {
    const handlerIdx = this.handlers.indexOf(onTick);
    if (handlerIdx < 0) return;

    this.handlers.splice(handlerIdx, 1);
    this.canHandle = this.handlers.length > 0;
  }

  start(): void {
    if(this.intrevalId !== undefined) return;

    this.canHandle = this.handlers.length > 0;
    this.intrevalId = setInterval(() => {
      if (!this.canHandle) return;
      for (let i = 0; i < this.handlers.length; i++) this.handlers[i]();
    }, 16);
  }

  pause(): void {
    this.canHandle = false;
    clearInterval(this.intrevalId);
    this.intrevalId = undefined;
  }

  dispose() {
    this.handlers = [];
    this.intrevalId !== undefined && clearInterval(this.intrevalId);
  }
}
