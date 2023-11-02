using Microsoft.AspNetCore.Mvc;
using TheGuide.Data;
using TheGuide.Models;

[ApiController]
[Route("api/[controller]")]

public class SeasonsController : ControllerBase
{
    private TheGuideDbContext _dbContext;

    public SeasonsController(TheGuideDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize] // comment out so post man can access.

    public IActionResult Get()
    {
        return Ok(_dbContext.Seasons);
    }
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        Season SeasonToReturn = _dbContext.Seasons
        .SingleOrDefault(s => s.Id == id);
        if (SeasonToReturn == null)
        {
            return NotFound();
        }
        return Ok(SeasonToReturn);
    }
}