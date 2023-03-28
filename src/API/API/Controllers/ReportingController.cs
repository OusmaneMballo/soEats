using API.Application.Reporting;
using API.Models;
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
    [Route("/reporting")]
    public class ReportingController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public ReportingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet("{ownerId:guid}")]
        [Authorize(Roles = "Restaurateur")]
        public async Task<ActionResult<IEnumerable<ReportingDto>>> GetReporting(Guid ownerId, DateTime startDate, DateTime endDate)
        {
            var reporting = await Mediator.Send(new GetReportingQuery { OwnerId = ownerId, StartDate = startDate, EndDate = endDate });
            return Ok(reporting);
        }
    }
}
