namespace TheGuide.Models;
public class City
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Country { get; set; }
    public decimal AveragePrice { get; set; }
    public int CityActivityId { get; set; }
    public List<CityActivity> CityActivities { get; set; }
}