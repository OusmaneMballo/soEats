using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static API.Domain.Reservation;

namespace API.Models
{
    public record ReservationDto(Guid Id,
                                 Guid RestaurantId,
                                 string ReservatorEmail,
                                 string ReservatorPhoneNumber,
                                 string ReservatorFirstname,
                                 string ReservatorLastname,
                                 DateTime ReservationDate,
                                 string ReservationTime,
                                 int NumberOfPlaces,
                                 Status ReservationStatus)
    {
    }
}
