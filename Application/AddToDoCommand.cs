using System;
using Application.Core;
using MediatR;
using Persistence;

namespace Application;

public class AddToDoCommand()
{
    public class Command : IRequest<Result<string>>
    {
        public required string ToDoToAdd { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            // Save to DB
            await context.SaveChangesAsync(cancellationToken);

            return Result<string>.Success(request.ToDoToAdd);
        }
    }
}