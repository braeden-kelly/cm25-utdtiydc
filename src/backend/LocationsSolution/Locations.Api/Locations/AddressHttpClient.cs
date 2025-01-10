using System.Text.Json.Serialization;
using System.Web;
using Microsoft.Extensions.Options;

namespace Locations.Api.Locations;

public class AddressHttpClient(HttpClient httpClient,  IOptions<AddressAuthOptions> optionsAccessor)
{
   public async Task<Address?> GetCorrectedAddressAsync(Address address)
   {
      var pathRaw =
         $"/street-address?auth-id={optionsAccessor.Value.Id}?auth-token={optionsAccessor.Value.Token}&license={optionsAccessor.Value.License}&street={HttpUtility.UrlEncode(address.Street)}&city={HttpUtility.UrlEncode(address.City)}&state={HttpUtility.UrlEncode(address.State)}&zip={HttpUtility.UrlEncode(address.Zip)}";

      var response = await httpClient.GetAsync(pathRaw);
      response.EnsureSuccessStatusCode();
      var content = await response.Content.ReadFromJsonAsync<List<AddressResultModel>>();
      if (content == null)
      {
         return null;
      }
      else
      {
         var component = content.FirstOrDefault()?.Components;
         if (component == null)
         {
            return null;
         }

         return new Address($"{component.PrimaryNumber}  {component.StreetName} {component.StreetSuffix}",
            component.CityName, component.StateAbbreviation, component.ZipCode);
       
      }

   }
}

public class AddressResultModel
{
   [JsonPropertyName("components")] public AddressResultComponentModel Components { get; set; } = new();
}


public class AddressResultComponentModel
{
   [JsonPropertyName("primary_number")]
   public string PrimaryNumber { get; set; } =  string.Empty;
   [JsonPropertyName("street_name")]
   public string StreetName { get; set; } = string.Empty;
   [JsonPropertyName("street_suffix")]
   public string  StreetSuffix { get; set; } = string.Empty;
   [JsonPropertyName("city_name")]
   public string CityName { get; set; } = string.Empty;
   [JsonPropertyName("state_abbreviation")]
   public string StateAbbreviation { get; set; } = string.Empty;
   [JsonPropertyName("zipcode")]
   public string ZipCode { get; set; } = string.Empty;
   [JsonPropertyName("plus4_code")]
   public string  Plus4Zip { get; set; } = string.Empty;
}

/*https://us-street.api.smarty.com/street-address?
   auth-id=YOUR+AUTH-ID+HERE&
   auth-token=YOUR+AUTH-TOKEN+HERE&
   license=us-rooftop-geocoding-cloud&
   street=1600+amphitheatre+pkwy&
   city=mountain+view&
   state=CA&
   candidates=10 */