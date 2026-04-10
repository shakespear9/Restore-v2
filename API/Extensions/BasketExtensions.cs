public static class BasketExtensions
{
    public static BasketDto ToBasketDto(this Basket basket)
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(x => new BasketItemDto
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Brand = x.Product.Brand,
                PictureUrl = x.Product.PictureUrl,
                Type = x.Product.Type,
                Price = x.Product.Price,
                Quantity = x.Quantity
            }).ToList()
        };


    }
}