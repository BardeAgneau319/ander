import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Session } from '../session';
import { SessionsService } from '../sessions.service';
import { SpeakersService } from '../speakers.service';
import { NoteCreationComponent } from '../note-creation/note-creation.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss'],
})
export class SessionDetailsComponent implements OnInit {

  // Path parameters
  id: number;

  session: Session;

  readonly IMAGE_ROOT = SpeakersService.IMAGE_ROOT

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
    public modalController: ModalController,
    public router: Router
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(_ => this.dismissModal());
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NoteCreationComponent,
      componentProps: {
        id: this.id
      },
      initialBreakpoint: 0.08,
      breakpoints: [0.08, 1],
      backdropBreakpoint: 0.5,
      canDismiss: false,
      backdropDismiss: false,
      cssClass: "notes-modal"
    });

    return await modal.present();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params["id"]);
    this.sessionsService.getSessionById(this.id).subscribe(s => this.session=s);

    await this.presentModal();
  }
}
