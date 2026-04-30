using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        private StoreContext _context { get; }

        [HttpGet] //api/products
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams param)
        {
            var query = _context.Products.Search(param.SearchTerm)
                                         .Filter(param.Brands, param.Types)
                                         .Sort(param.OrderBy)
                                         .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, param.PageNumber, param.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return products;
            // return Ok(new { Items = products, products.Metadata });
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

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilter()
        {
            var brands = await _context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
