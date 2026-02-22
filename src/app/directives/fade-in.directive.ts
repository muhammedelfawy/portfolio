import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const el = this.el.nativeElement;

    // Initial state: hidden, shifted down, scaled down, blurred
    this.renderer.addClass(el, 'opacity-0');
    this.renderer.addClass(el, 'translate-y-24'); // More active movement (6rem)
    this.renderer.addClass(el, 'scale-95');       // Subtle scale
    this.renderer.addClass(el, 'blur-sm');        // Subtle blur

    // Transition properties
    this.renderer.addClass(el, 'transition-all');
    this.renderer.addClass(el, 'duration-[1200ms]'); // Longer duration
    this.renderer.addClass(el, 'ease-[cubic-bezier(0.25,0.8,0.25,1)]'); // Smooth easing
    this.renderer.addClass(el, 'will-change-transform'); // Performance hint

    // Create observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reveal state
          this.renderer.removeClass(el, 'opacity-0');
          this.renderer.removeClass(el, 'translate-y-24');
          this.renderer.removeClass(el, 'scale-95');
          this.renderer.removeClass(el, 'blur-sm');

          // Ensure final state
          this.renderer.addClass(el, 'opacity-100');
          this.renderer.addClass(el, 'translate-y-0');
          this.renderer.addClass(el, 'scale-100');
          this.renderer.addClass(el, 'blur-0');

          // Stop observing once animated
          this.observer?.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px' // Trigger when element is 100px into viewport
    });

    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}