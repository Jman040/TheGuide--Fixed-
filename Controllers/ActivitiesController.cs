using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheGuide.Data;
using TheGuide.Models;

[ApiController]
[Route("api/[controller]")]

public class ActivitiesController : ControllerBase
{
    private TheGuideDbContext _dbContext;

    public ActivitiesController(TheGuideDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize] // comment out so post man can access.

    public IActionResult Get()
    {
        return Ok(_dbContext.Activities);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        Activity activitiesToReturn = _dbContext.Activities
        .SingleOrDefault(a => a.Id == id);
        if (activitiesToReturn == null)
        {
            return NotFound();
        }
        return Ok(activitiesToReturn);
    }

    [HttpPost]
    public IActionResult CreateNewActivity(Activity activity)
    {
        _dbContext.Activities.Add(activity);
        _dbContext.SaveChanges();
        return Created($"/api/activities/{activity.Id}", activity);
    }
}