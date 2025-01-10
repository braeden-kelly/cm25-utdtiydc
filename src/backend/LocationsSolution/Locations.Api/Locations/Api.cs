namespace Locations.Api.Locations;

public static class Api
{
    public static IEndpointRouteBuilder MapLocationsApi(this IEndpointRouteBuilder route)
    {
        var group =  route.MapGroup("locations");
        group.MapPost("", async (LocationCreateModel request, AddressHttpClient addressClient) =>
        {
            var addressResponse = await addressClient.GetCorrectedAddressAsync(request.Address);
            if (addressResponse is null)
            {
                return Results.BadRequest(new  {message = "Address not found"});
            }
            
              var response =  new LocationResponseModel(Guid.NewGuid(),  request.Name, request.Phone, request.Note, addressResponse);
            return Results.Ok(response);
        });
        return route;
    }
}