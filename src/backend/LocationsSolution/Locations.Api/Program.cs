using Locations.Api.Locations;
using Marten;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("data") ?? throw new Exception("Connection string not found");

builder.Services.AddMarten(options =>
{
    options.Connection(connectionString);
}).UseLightweightSessions();

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

