using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Commands;

public class GetPhotos
{
    public class Command : IRequest<Result<List<Photo>>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(Command request, CancellationToken cancellationToken)
        {
            var photos = await context.Users
            .Where(x => x.Id == request.Id)
            .SelectMany(x => x.Photos)
            .ToListAsync(cancellationToken);

            return Result<List<Photo>>.Success(photos);
        }
    }
}