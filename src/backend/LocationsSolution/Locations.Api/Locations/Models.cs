namespace Locations.Api.Locations;

public record Address(string Street, string City, string State, string Zip);

public record LocationCreateModel(string Name, string Phone, string? Note, Address Address);

public  record LocationResponseModel(Guid Id, string Name, string Phone, string? Note, Address Address);
public class AddressAuthOptions
{
    public const string AddressAuth = "AddressAuth";
    public  string  Id { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public string License { get; set; } = string.Empty;
}