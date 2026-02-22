import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, output, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-intro',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent implements OnInit, OnDestroy {

  complete = output<void>();

  displayedText = signal('');
  isExiting = signal(false);

  private readonly fullText = "If you wanna build awesome web page, you are at the right destination.";
  private platformId = inject(PLATFORM_ID);
  private timeouts: any[] = [];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startTyping();

      // Keep intro visible for 10 seconds total as requested
      const exitTimer = setTimeout(() => {
        this.startExit();
      }, 10000);
      this.timeouts.push(exitTimer);
    } else {
      // SSR handling
      this.complete.emit();
    }
  }

  ngOnDestroy() {
    this.timeouts.forEach(clearTimeout);
  }

  private startTyping() {
    let index = 0;
    const typeChar = () => {
      if (index < this.fullText.length) {
        this.displayedText.update(text => text + this.fullText.charAt(index));
        index++;
        // Random typing speed for realism (30ms to 70ms)
        const delay = Math.random() * 40 + 30;
        const timer = setTimeout(typeChar, delay);
        this.timeouts.push(timer);
      }
    };

    // Start typing after a small initial delay
    const startTimer = setTimeout(typeChar, 500);
    this.timeouts.push(startTimer);
  }

  private startExit() {
    this.isExiting.set(true);
    // Wait for transition (1000ms) to finish before emitting complete
    const completeTimer = setTimeout(() => {
      this.complete.emit();
    }, 1000);
    this.timeouts.push(completeTimer);
  }
}