using API.Application.Cards.ProductsType;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace API.Controllers
{
    [Route("/productType")]
    public class ProductTypeController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProductTypeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductsType()
        {
            var productsType = await Mediator.Send(new GetProductsTypeQuery());
            return Ok(productsType);
        }

        [HttpPost]
       // [Authorize(Roles = "Admin")]
       [AllowAnonymous]
        public async Task<IActionResult> PostProductType(CreateProductTypeCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await Mediator.Send(command);
            return Ok();
        }
    }
}
