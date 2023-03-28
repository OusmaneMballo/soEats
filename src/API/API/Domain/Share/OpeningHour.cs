using System;

namespace API.Domain
{
    public class OpeningHour
    {
        public Guid Id { get; private set; }
        public DayOfWeek DayOfWeek { get; private set; }
        public Slot Slot1 { get; set; }
        public Slot Slot2 { get; set; }

        private OpeningHour() { }

        public OpeningHour(Guid id, DayOfWeek dayOfWeek)
        {
            Id = id;
            DayOfWeek = dayOfWeek;
        }

        public void SetSlot1(string startTime, string endTime)
        {
            Slot1 = new Slot(TimeSpan.Parse(startTime), TimeSpan.Parse(endTime));
        }

        public void SetSlot2(string startTime, string endTime)
        {
            if (startTime == null && endTime == null)
            {
                Slot2 = null;
            }
            else
            {
                Slot2 = new Slot(TimeSpan.Parse(startTime), TimeSpan.Parse(endTime));
            }

            
        }
    }

    public class Slot
    {
        public TimeSpan StartTime { get; private set; }
        public TimeSpan EndTime { get; private set; }

        private Slot() { }
        public Slot(TimeSpan startTime, TimeSpan endTime)
        {
            StartTime = startTime;
            EndTime = endTime;
        }

    }
}