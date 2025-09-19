using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context, IMapper mapper) : BaseApiController
{
    private const string basketIdKey = "basketId";

    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();
        if (basket == null)
        {
            return NoContent();
        }
        var response = mapper.Map<BasketDto>(basket);
        return response;
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        basket ??= CreateBasket();
        var product = await context.Products.FindAsync(productId);
        if (product == null)
        {
            return BadRequest("Problem adding item to basket");
        }
        basket.AddItem(product, quantity);
        var result = await context.SaveChangesAsync() > 0;
        if (!result)
        {
            return BadRequest("Problem updating basket");
        }
        var response = mapper.Map<BasketDto>(basket);
        return CreatedAtAction(nameof(GetBasket), response);
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        if (basket == null)
        {
            return BadRequest("Unable to retrieve basket");
        }
        basket.RemoveItem(productId, quantity);
        var result = await context.SaveChangesAsync() > 0;
        if (!result)
        {
            return BadRequest("Problem updating basket");
        }
        return Ok();
    }

    private Basket CreateBasket()
    {
        var basketIdValue = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append(basketIdKey, basketIdValue, cookieOptions);
        var basket = new Basket() { BasketId = basketIdValue };
        context.Baskets.Add(basket);
        return basket;
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(basket => basket.Items)
            .ThenInclude(basketItem => basketItem.Product)
            .FirstOrDefaultAsync(basket => basket.BasketId == Request.Cookies[basketIdKey]);
    }
}
