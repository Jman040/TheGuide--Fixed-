namespace TheGuide.Models;

public class CityActivity
{
    public int Id { get; set; }
    public int CityId { get; set; }
    public City City { get; set; }
    public int ActivityId { get; set; }
    public Activity Activity { get; set; }

}