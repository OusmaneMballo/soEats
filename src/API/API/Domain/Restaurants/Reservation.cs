using API.Models;
using System;

namespace API.Domain
{
    public class Reservation
    {
        public Guid Id { get; private set; }
        public Guid RestaurantId { get; private set; }
        public string ReservatorEmail { get; private set; }
        public string ReasonToCancel { get; private set; }
        public string ReservatorPhoneNumber { get; private set; }
        public string ReservatorFirstname { get; private set; }
        public string ReservatorLastname { get; private set; }
        public DateTime ReservationDate { get; private set; }
        public string ReservationTime { get; private set; }
        public int NumberOfPlaces { get; private set; }
        public Status ReservationStatus { get; set; }

        private Reservation()
        {
        }

        public Reservation(Guid id, Guid restaurantId, string reservatorEmail, 
            string reservatorPhoneNumber, string reservatorFirstname, 
            string reservatorLastname, DateTime reservationDate, string reservationTime, int numberOfPlaces)
        {
            Id = id;
            RestaurantId = restaurantId;
            ReservatorEmail = reservatorEmail;
            ReservatorPhoneNumber = reservatorPhoneNumber;
            ReservatorFirstname = reservatorFirstname;
            ReservatorLastname = reservatorLastname;
            ReservationDate = reservationDate;
            ReservationTime = reservationTime;
            NumberOfPlaces = numberOfPlaces;
            ReservationStatus = Status.InProgress;
        }

        internal void Confirm()
        {
            if (ReservationStatus == Status.InProgress)
                ReservationStatus = Status.Confirmed;
        }
        internal void Cancel(string reasonToCancel)
        {
            if (ReservationStatus != Status.Cancelled)
            {
                ReasonToCancel = reasonToCancel;
                ReservationStatus = Status.Cancelled;
            }
        }
        internal void Update(string reservatorEmail, string reservatorPhoneNumber, string reservatorFirstname,
                             string reservatorLastname, DateTime reservationDate, string reservationTime, int numberOfPlaces)
        {
            ReservatorEmail = reservatorEmail ?? ReservatorEmail;
            ReservatorPhoneNumber = reservatorPhoneNumber ?? ReservatorPhoneNumber;
            ReservatorFirstname = reservatorFirstname ?? ReservatorFirstname;
            ReservatorLastname = reservatorLastname ?? ReservatorLastname;
            ReservationDate = reservationDate ;
            ReservationTime = reservationTime ?? ReservationTime;
            NumberOfPlaces = numberOfPlaces;

        }

        public enum Status{InProgress, Confirmed, Cancelled}
    }
}
