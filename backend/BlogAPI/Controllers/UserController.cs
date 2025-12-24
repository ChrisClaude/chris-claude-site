using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
#pragma warning disable CA1515 // Controllers must be public for ASP.NET Core discovery
    public sealed class UserController : ControllerBase
#pragma warning restore CA1515
    {
    }
}
