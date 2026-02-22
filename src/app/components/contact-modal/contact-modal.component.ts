import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactModalService } from '../../services/contact-modal.service';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';



@Component({
  selector: 'app-contact-modal',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent {
  modalService = inject(ContactModalService);
  fb = inject(FormBuilder);

  isopen() { }
  contactForm: FormGroup;
  isSubmitting = signal(false);
  showSuccess = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      details: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  close() {
    if (this.isSubmitting()) return;
    this.modalService.close();
    setTimeout(() => {
      this.contactForm.reset();
      this.showSuccess.set(false);
    }, 300);
  }

  onSubmit(contactForm: FormGroup) {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      emailjs.send("service_n9m3kdu", "template_imkqc6j", { ...contactForm.value }, { publicKey: "HxbPyTwn2OsU5-U_G" }).then(() => console.log("email send successfully")
      )
      // console.log(contactForm.value)
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.showSuccess.set(true);

        // Auto close after success
        setTimeout(() => {
          this.close();
        }, 2000);
      }, 1500);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

}
