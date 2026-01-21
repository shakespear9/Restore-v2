using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        private StoreContext _context { get; }

        [HttpGet] //api/products
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return products;
        }

        [HttpGet("{id}")] //api/products/1
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product is null)
            {
                return NotFound();
            }

            return product;
        }
    }
}
