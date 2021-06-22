using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AzmoonTracker.Services.TakeExamRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AzmoonTracker.ViewModels;

namespace AzmoonTracker.Controllers
{
    [Route("api/ExamParticipant")]
    [ApiController]
    public class ExamParticipantController : ControllerBase
    {
        private readonly ITakeExamRepository takeExamRepository;

        public ExamParticipantController(ITakeExamRepository _takeExamRepository)
        {
            takeExamRepository = _takeExamRepository;
        }

        [HttpPost("EnrollExam/{ExamId}")]
        public async Task<IActionResult> EnrollExam(string ExamId)
        {

            //TODO: check the clock
            if (!takeExamRepository.EnrollExam(ExamId, "q"))
                return BadRequest();
            if (! await takeExamRepository.SaveChangesAsync())
                return BadRequest();

            return Ok();
        }

        [HttpDelete("UnenrollExam/{ExamId}")]
        public async Task<IActionResult> EnrollExamAsync(string ExamId)
        {
            //TODO: check the clock

            if (!takeExamRepository.UnenrollExam(ExamId, "q"))
                return BadRequest();
            if (!await takeExamRepository.SaveChangesAsync())
                return BadRequest();

            return Ok();
        }

        [HttpPut("WriteAnswer")]
        public async Task<IActionResult> SubmitAnswer(AnswerViewModel answer)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            //TODO: check the clock

            if (!takeExamRepository.FillAnswer(answer, "q"))
                return BadRequest();

            if (!await takeExamRepository.SaveChangesAsync())
                return BadRequest();

            return Ok();
        }

    }
}
