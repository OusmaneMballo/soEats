using API.Application.SuperMarketApp.Sections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("supermarket/sections")]
    public class SectionsController : ApiControllerBase
    {
        private readonly IConfiguration configuration;

        public SectionsController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet("{superMarketId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSections(Guid superMarketId)
        {
            var sections = await Mediator.Send(new GetSectionsBySuperMarketIdQuery { SuperMarketId = superMarketId });
            return Ok(sections);
        }

        [HttpPost]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> PostSection([FromForm] CreateSectionCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await Mediator.Send(command);
            return Ok();
        }

        [HttpPut("{Id:guid}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> UpdateSection(Guid Id, [FromForm]UpdateSectionCommand command)
        {
            if(Id != command.IdSection)
            {
                return BadRequest();
            }

            var ray = await Mediator.Send(command);

            return Ok(ray);
        }

        [HttpPut("{Id:guid}/categories")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> UpdateRay(Guid Id, UpdateListCategoryRayCommand command)
        {
            if (Id != command.IdRay)
            {
                return BadRequest();
            }

            var ray = await Mediator.Send(command);

            return Ok(ray);
        }

        [HttpDelete("{Id:guid}/{IdSuperMarket:guid}")]
        [Authorize(Roles = "SuperMarketManager")]
        public async Task<IActionResult> DeleteSection(Guid Id, Guid IdSuperMarket)
        {
            try
            {
                await Mediator.Send(new DeleteSectionCommand { IdSuperMarket = IdSuperMarket, IdSection = Id });
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
