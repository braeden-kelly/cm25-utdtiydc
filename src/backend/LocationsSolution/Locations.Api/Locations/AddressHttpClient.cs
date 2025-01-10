namespace Locations.Api;

public class AddressHttpClient
{
    private readonly HttpClient _httpClient;
    public AddressHttpClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
}