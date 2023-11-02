using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TheGuide.Models;
using Microsoft.AspNetCore.Identity;

namespace TheGuide.Data;
public class TheGuideDbContext : IdentityDbContext<IdentityUser> //# TheGuideDbContext inherits from the IdentityDbContext<IdentityUser> class, rather than from DbContext
//# IdentityDbContext comes with a number of extra models and tables that will be added to the database. They include:
//# IdentityUser - this will hold login credentials for users
//# IdentityRole - this will hold the various roles that a use can have
//# IdentityUserRole - a many-to-many table between roles and users. These define which users have which roles.

{
    private readonly IConfiguration _configuration;
    public DbSet<Activity> Activities { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<Season> Seasons { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<UserProfileCity> UserProfileCities { get; set; }

    public TheGuideDbContext(DbContextOptions<TheGuideDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); //# this is a method

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole //# seeding the database with the identityrole information
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser //# seeding the database with the identityuser information
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

        modelBuilder.Entity<Activity>().HasData(new Activity[]
        {
                new Activity
                {
                    Id = 1,
                    Title = "City Tour",
                    Price = 20.00M
                },
                new Activity
                {
                    Id = 2,
                    Title = "Coastal Tour",
                    Price = 18.50M
                },
                new Activity
                {
                    Id = 3,
                    Title = "Gondola Ride",
                    Price = 45.00M
                },
                new Activity
                {
                    Id = 4,
                    Title = "Museum Tour",
                    Price = 17.00M
                },
                new Activity
                {
                    Id = 5,
                    Title = "Boat Tour",
                    Price = 30.00M
                }
        });
        modelBuilder.Entity<City>().HasData(new City[]
        {
                new City
                {
                    Id = 1,
                    Name = "Paris",
                    Country = "France",
                    AveragePrice = 100.00M
                },
                new City
                {
                    Id = 2,
                    Name = "Rome",
                    Country = "Italy",
                    AveragePrice = 85.00M
                },
                new City
                {
                    Id = 3,
                    Name = "Venice",
                    Country = "Italy",
                    AveragePrice = 120.00M
                },
        });
        modelBuilder.Entity<Season>().HasData(new Season[]
        {
                new Season
                {
                    Id = 1,
                    Name = "Spring"
                },
                new Season
                {
                    Id = 2,
                    Name = "Summer"
                },
                new Season
                {
                    Id = 3,
                    Name = "Autumn"
                },
                new Season
                {
                    Id = 4,
                    Name = "Winter"
                }

        });
        modelBuilder.Entity<UserProfileCity>().HasData(new UserProfileCity[]
        {
                new UserProfileCity
                {
                    Id = 1,
                    UserProfileId = 1,
                    SeasonId = 1, // Spring season
                    CityId = 1, // Paris
                },
                new UserProfileCity
                {
                    Id = 2,
                    UserProfileId = 1,
                    SeasonId = 2, // Summer season
                    CityId = 2, // Rome
                },
        });
        modelBuilder.Entity<CityActivity>().HasData(new CityActivity[]
        {
                new CityActivity
                {
                    Id = 1,
                    CityId = 1,
                    ActivityId = 1,
                },
                new CityActivity
                {
                    Id = 2,
                    CityId = 2,
                    ActivityId = 2,
                },
                new CityActivity
                {
                    Id = 3,
                    CityId = 3,
                    ActivityId = 3,
                },

        });
    }
}