using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;


namespace Application.Profiles.Commands;

public class ChangeBio
{
    public class Command : IRequest<Result<string>>
    {
        public required string Bio { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context)
        : IRequestHandler<Command, Result<string>> {

        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Bio))
                return Result<string>.Failure("Problem updating bio Bio is undefined", 400);

            var user = await userAccessor.GetUserAsync();

            user.Bio = request.Bio;

            await context.SaveChangesAsync(cancellationToken);

            return Result<string>.Success(request.Bio);
        }
    }
}