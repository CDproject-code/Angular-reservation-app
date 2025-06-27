import { Injectable } from '@angular/core';
import  {Reservation} from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() {
    const storedReservations = localStorage.getItem('reservations');
    this.reservations = storedReservations ? JSON.parse(storedReservations) : [];
  }

  private reservations: Reservation[] = [];

  //CRUD operations

  getReservetions(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id)
  }

  addReservation(reservation: Reservation): void {
    reservation.id = new Date().getTime().toString();

    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    this.reservations = this.reservations.filter(res => res.id !== id);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
    }
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
