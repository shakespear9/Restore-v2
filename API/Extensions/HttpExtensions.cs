using System.Text.Json;
using Microsoft.Net.Http.Headers;

public static class HttpExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, PaginationMetadata metadata)
    {
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        response.Headers.Append("Pagination", JsonSerializer.Serialize(metadata, jsonOptions));
        response.Headers.Append(HeaderNames.AccessControlExposeHeaders, "Pagination");
    }
}