using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator? mediator;

    // ??= if this is null - execute what is to the right of it. If not null, return the value of mediator
    // GetService<IMediator>()! -  The ! is a null-forgiving operator, telling the compiler that we are sure this will not be null.
    protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetService<IMediator>()!;
}
