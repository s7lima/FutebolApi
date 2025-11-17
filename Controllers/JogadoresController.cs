using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FutebolApi.Data;
using FutebolApi.Models;

namespace FutebolApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JogadoresController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<JogadoresController> _logger;

        public JogadoresController(AppDbContext context, ILogger<JogadoresController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<Jogador>> CriarJogador(Jogador jogador)
        {
            try
            {
                _context.Jogadores.Add(jogador);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(ObterPorId), new { id = jogador.Id }, jogador);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar jogador");
                return StatusCode(500, "Erro interno ao criar jogador");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jogador>>> ListarJogadores()
        {
            return await _context.Jogadores.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Jogador>> ObterPorId(int id)
        {
            var jogador = await _context.Jogadores.FindAsync(id);
            if (jogador == null)
                return NotFound();
            return jogador;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarJogador(int id, Jogador jogador)
        {
            if (id != jogador.Id)
                return BadRequest();

            try
            {
                _context.Entry(jogador).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar jogador");
                return StatusCode(500, "Erro interno ao atualizar jogador");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarJogador(int id)
        {
            var jogador = await _context.Jogadores.FindAsync(id);
            if (jogador == null)
                return NotFound();

            _context.Jogadores.Remove(jogador);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
