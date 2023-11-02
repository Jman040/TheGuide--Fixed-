
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGuide.Data;
using TheGuide.Models;

[ApiController]
[Route("api/[controller]")]

public class UserProfileCitiesController : ControllerBase
{
  private TheGuideDbContext _dbContext;

  public UserProfileCitiesController(TheGuideDbContext context)
  {
    _dbContext = context;
  }
  [HttpGet("{userId}")]
  // [Authorize]
  public IActionResult getByUserId(int userId)
  {
    var userCities = _dbContext.UserProfileCities
    .Include(ups => ups.UserProfile)
    .Include(ups => ups.Season)
    .Include(ups => ups.City)
    .ThenInclude(c => c.CityActivities)
    .ThenInclude(ca => ca.Activity)
    .Where(ups => ups.UserProfileId == userId).ToList();
    if (userCities == null)
    {
      return NotFound();
    }
    return Ok(userCities);
  }
  [HttpPost]
  public IActionResult postNewUserProfileCity(UserProfileCity userProfileCity)
  {
    _dbContext.UserProfileCities.Add(userProfileCity);
    _dbContext.SaveChanges();
    return Created($"/api/userProfileCities/{userProfileCity.Id}", userProfileCity);

  }
}