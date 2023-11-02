namespace TheGuide.Models;

public class UserProfileCity
{
    public int Id { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }
    public int SeasonId { get; set; }
    public Season Season { get; set; }
    public int CityId { get; set; }
    public City City { get; set; }

}