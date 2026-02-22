import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ContactModalService } from '../../services/contact-modal.service';


@Component({
  selector: 'app-hero',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  modalService = inject(ContactModalService);
  startAnimation = input<boolean>(false);

  openModal() {
    this.modalService.open();
  }

}
