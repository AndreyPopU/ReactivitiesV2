using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class TodosController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Todo>>> GetTodos()
    {
        return await context.Todos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(int id)
    {
        var todo = await context.Todos.FindAsync(id);

        if (todo == null) return NotFound();

        return todo;
    }

    [HttpPost]
    public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
    {
        context.Todos.Add(todo);
        await context.SaveChangesAsync();

        return Ok(todo);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTodo(int id)
    {
        var todo = await context.Todos.FindAsync(id);

        if (todo == null) return NotFound();

        context.Todos.Remove(todo);
        await context.SaveChangesAsync();

        return NoContent();
    }
}