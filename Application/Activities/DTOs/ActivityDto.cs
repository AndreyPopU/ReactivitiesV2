using System;
using Application.Profiles.DTOs;

namespace Application.Activities.DTOs;

public class ActivityDto
{
    public required string ID { get; set; }
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool isCancelled { get; set; }
    public required string HostDisplayName { get; set; }
    public required string HostId { get; set; }

    // Location Props
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    public ICollection<UserProfile> Attendees { get; set; } = [];
}