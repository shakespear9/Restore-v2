using API.Controllers;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class BasketController : BaseApiController
{
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetriveBasket();

        if (basket is null) return NoContent();

        var basketDto = basket.ToBasketDto();

        return Ok(basketDto);
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetriveBasket();
        basket ??= CreateBasket();

        var product = await _context.Products.FindAsync(productId);
        if (product is null) return BadRequest("Problem adding item to basket");

        basket.AddItem(product, quantity);

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToBasketDto());

        return BadRequest("Problem updating basket");

    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetriveBasket();
        if (basket is null) return BadRequest("Problem removing item from basket");

        basket.RemoveItem(productId, quantity);
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return NoContent();

        return BadRequest("Problem updating basket");

    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket
        {
            BasketId = basketId
        };
        _context.Baskets.Add(basket);
        return basket;
    }

    private async Task<Basket?> RetriveBasket()
    {
        var basket = await _context.Baskets.Include(x => x.Items)
                                    .ThenInclude(x => x.Product)
                                    .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);

        return basket;
    }
}