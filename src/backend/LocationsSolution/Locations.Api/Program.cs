using Locations.Api.Locations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<AddressAuthOptions>(builder.Configuration.GetSection(AddressAuthOptions.AddressAuth));
var authUrl  = builder.Configuration.GetValue<string>("addressVerificationUrl") ??  throw new Exception("authUrl not configured");
builder.Services.AddHttpClient<AddressHttpClient>(client =>
{
    client.BaseAddress = new Uri(authUrl);
});
var app = builder.Build();

app.MapLocationsApi();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();

