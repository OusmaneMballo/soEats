using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Reservations
{
    public static class Extensions
    {
        public static ReservationDto ProjectToReservationDto(this Reservation reservation)
        {
            return new ReservationDto(reservation.Id,
                                 reservation.RestaurantId,
                                 reservation.ReservatorEmail,
                                 reservation.ReservatorPhoneNumber,
                                 reservation.ReservatorFirstname,
                                 reservation.ReservatorLastname,
                                 reservation.ReservationDate,
                                 reservation.ReservationTime,
                                 reservation.NumberOfPlaces,
                                 reservation.ReservationStatus);
        }

        public static string GetUniqueString(this Guid id)
        {
            return Convert.ToBase64String(id.ToByteArray())
                              .Replace("/", "")
                              .Replace("+", "")
                              .ToLowerInvariant()
                              .Substring(0, 8);
        }
    }
}
