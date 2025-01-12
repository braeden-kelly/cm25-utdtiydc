using Marten;

namespace Locations.Api.Locations;

public static class Api
{
    public static IEndpointRouteBuilder MapLocationsApi(this IEndpointRouteBuilder route)
    {
        var group =  route.MapGroup("locations");
        group.MapPost("", async (LocationCreateModel request, AddressHttpClient addressClient, IDocumentSession session) =>
        {
            var addressResponse = await addressClient.GetCorrectedAddressAsync(request.Address);
            if (addressResponse is null)
            {
                return Results.BadRequest(new  {message = "Address not found"});
            }
            
            var response =  new LocationResponseModel(Guid.NewGuid(),  request.Name, request.Phone, request.Note, addressResponse);
            session.Store(response);
            await session.SaveChangesAsync();
            return Results.Ok(response);
        });

        group.MapGet("", async (IDocumentSession session) =>
        {
            var locations = await session.Query<LocationResponseModel>().ToListAsync();
            return Results.Ok(locations);
        });
        return route;
    }
    
    
}