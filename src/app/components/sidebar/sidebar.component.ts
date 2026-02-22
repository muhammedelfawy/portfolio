import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, AfterViewInit, OnDestroy, input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  startAnimation = input<boolean>(false);

  navItems = [
    { id: 'hero', label: 'Home', icon: 'fas fa-home' },
    { id: 'about', label: 'About', icon: 'fas fa-user-astronaut' },
    { id: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-code-branch' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-layer-group' },
    { id: 'testimonials', label: 'Testimonials', icon: 'fas fa-comment-dots' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-paper-plane' }
  ];

  socials = [
    { icon: 'fab fa-github', url: 'https://github.com/muhammedelfawy', color: 'text-white' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/muhammedelfawy', color: 'text-[#0077b5]' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/+201030155225', color: 'text-[#25D366]' },
    { icon: 'fas fa-envelope', url: 'mailto:elfawymuhammed@gmail.com', color: 'text-rose-500' }
  ];

  activeSection = signal<string>('hero');
  hoveredItem = signal<string | null>(null);
  isMobileMenuOpen = signal<boolean>(false);
  imageTransform = signal<string>('');

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  toggleMenu() {
    this.isMobileMenuOpen.update(v => !v);
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  getAnchorHref(id: string): string {
    return '#' + id;
  }

  onNavClick(event: Event, id: string) {
    this.closeMenu();
    this.activeSection.set(id);
  }

  scrollToTop(event: Event) {
    this.activeSection.set('hero');
  }

  // 3D Tilt Effect
  onImageMouseMove(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate rotation (-15 to 15 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((y - centerY) / centerY) * -15;

    this.imageTransform.set(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
  }

  onImageMouseLeave() {
    this.imageTransform.set('perspective(1000px) rotateX(0) rotateY(0) scale(1)');
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Active when element is near top/center
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, options);

    this.navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }
}