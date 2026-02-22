import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { BackgroundComponent } from './components/background/background.component';
import { IntroComponent } from './components/intro/intro.component';
import { FadeInDirective } from './directives/fade-in.directive';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import Lenis from '@studio-freight/lenis';



@Component({
  selector: 'app-root',
  imports: [SidebarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    TestimonialsComponent,
    ContactComponent,
    BackgroundComponent,
    IntroComponent,
    FadeInDirective,
    ContactModalComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'newPortfolio';
  showIntro = signal(true);
  private lenis: Lenis | undefined;
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private rafId: number | undefined;

  onIntroComplete() {
    this.showIntro.set(false);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initLenis();
    }
  }

  ngOnDestroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private initLenis() {
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };

      this.rafId = requestAnimationFrame(raf);
    });
  }
}

