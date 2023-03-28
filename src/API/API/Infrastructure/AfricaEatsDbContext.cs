using API.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Infrastructure
{
    public class AfricaEatsDbContext : DbContext
    {
        public DbSet<Restaurateur> Restaurateurs { get; set; }
        public AfricaEatsDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }
    }

    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<Restaurateur>
    {
        public void Configure(EntityTypeBuilder<Restaurateur> builder)
        {
            builder.Property(e => e.Email)
                   .HasMaxLength(128);
        }
    }

    public class RestaurantEntityTypeConfiguration : IEntityTypeConfiguration<Restaurant>
    {
        public void Configure(EntityTypeBuilder<Restaurant> builder)
        {
            var navigation = builder.Metadata.FindNavigation(nameof(Restaurant.MenuImagesUrls));
            navigation.SetPropertyAccessMode(PropertyAccessMode.Field);

            builder.HasMany(b => b.MenuImagesUrls).WithOne();
            builder.HasMany(b => b.OpeningHours).WithOne();

            builder.Property(e => e.Name)
                  .HasMaxLength(255);

            builder.Property(e => e.NormalizedName)
                .HasMaxLength(255);

            builder.Property(e => e.SlugId)
                .HasMaxLength(255);

            builder.Property(e => e.Address)
                   .HasMaxLength(255);

            builder.OwnsOne(r => r.Contact)
                 .Property(c => c.Email)
                 .HasMaxLength(128);

            builder.OwnsOne(r => r.Contact)
               .Property(c => c.PhoneNumber)
               .HasMaxLength(30);
        }
    }

    public class ImageEntityTypeConfiguration : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder
                .Property(img => img.ImageUrl)
                .HasConversion(
                        v => v.AbsoluteUri,
                        v => new Uri(v));
        }
    }

    public class OpeningHourEntityTypeConfiguration : IEntityTypeConfiguration<OpeningHour>
    {
        public void Configure(EntityTypeBuilder<OpeningHour> builder)
        {
            builder.Property(o => o.DayOfWeek)
                   .HasConversion(
                         v => v.ToString(),
                         v => (DayOfWeek)Enum.Parse(typeof(DayOfWeek), v));

            builder.OwnsOne(o => o.Slot1)
                   .Property(s => s.StartTime)
                   .HasConversion(
                      v => $"{v.Hours}:{v.Minutes}",
                      v => TimeSpan.Parse(v)
                );

            builder.OwnsOne(o => o.Slot1)
                   .Property(s => s.EndTime)
                   .HasConversion(
                      v => $"{v.Hours}:{v.Minutes}",
                      v => TimeSpan.Parse(v)
                );

            builder.OwnsOne(o => o.Slot2)
                   .Property(s => s.StartTime)
                   .HasConversion(
                      v => $"{v.Hours}:{v.Minutes}",
                      v => TimeSpan.Parse(v)
                );

            builder.OwnsOne(o => o.Slot1)
                   .Property(s => s.EndTime)
                   .HasConversion(
                      v => $"{v.Hours}:{v.Minutes}",
                      v => TimeSpan.Parse(v)
                );
        }
    }
}