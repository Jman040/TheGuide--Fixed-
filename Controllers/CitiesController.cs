using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheGuide.Data;
using TheGuide.Models;

[ApiController]
[Route("api/[controller]")]

public class CitiesController : ControllerBase
{
    private TheGuideDbContext _dbContext;

    public CitiesController(TheGuideDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(
        _dbContext.Cities
        .Include(c => c.CityActivities)
        .ThenInclude(ca => ca.Activity).ToList()
        );
    }
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        City cityToReturn = _dbContext.Cities.
        Include(c => c.CityActivities).ThenInclude(ca => ca.Activity).SingleOrDefault(c => c.Id == id);
        if (cityToReturn == null)
        {
            return NotFound();
        }
        return Ok(cityToReturn);
    }
    [HttpPost]
    public IActionResult CreateNewCity(City city)
    {
        _dbContext.Cities.Add(city);
        _dbContext.SaveChanges();
        return Created($"/api/cities/{city.Id}", city);
    }
    [HttpDelete("{cityId}")]
    public IActionResult DeleteCity(int cityId)
    {
        City cityToRemove = _dbContext.Cities.SingleOrDefault(c => c.Id == cityId);
        _dbContext.Cities.Remove(cityToRemove);
        _dbContext.SaveChanges();
        return NoContent();
    }
};