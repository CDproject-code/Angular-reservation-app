import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation) {
          this.reservationForm.patchValue(reservation);
        }
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  reservationForm: FormGroup = new FormGroup({});

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation =  this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if(id){
        // Update existing reservation
        reservation.id = id;
        this.reservationService.updateReservation(id, reservation).subscribe(()=> {
          console.log(`Reservation with id ${id} updated`);
        });
      } else {
        // Add new reservation
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log('New reservation added');
        });
      }

      this.router.navigate(['/list']);
    }
  }
}
