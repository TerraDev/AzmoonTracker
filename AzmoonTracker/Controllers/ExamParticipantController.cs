using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AzmoonTracker.Services.TakeExamRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AzmoonTracker.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

        [Authorize]
        [HttpPost("EnrollExam/{ExamId}")]
        public async Task<IActionResult> EnrollExam(string ExamId)
        {

            //TODO: check the clock
            if (!takeExamRepository.EnrollExam(ExamId, User.FindFirstValue(ClaimTypes.NameIdentifier)))
                return BadRequest();
            if (! await takeExamRepository.SaveChangesAsync())
                return BadRequest();

            return Ok();
        }

        [Authorize]
        [HttpDelete("UnenrollExam/{ExamId}")]
        public async Task<IActionResult> UnenrollExam(string ExamId)
        {
            //TODO: check the clock

            if (!takeExamRepository.UnenrollExam(ExamId,
                User.FindFirstValue(ClaimTypes.NameIdentifier)))

                return BadRequest();
            if (!await takeExamRepository.SaveChangesAsync())
                return BadRequest();

            return Ok();
        }

        [Authorize]
        [HttpGet("GetUserExamStatus/{ExamId}")]
        public IActionResult GetUserExamStatus(string ExamId)
        {
            var status = takeExamRepository.GetUserExamStatus(ExamId,
                User.FindFirstValue(ClaimTypes.NameIdentifier));
            return Ok(status);
        }

        [Authorize]
        [HttpPut("WriteAnswer")]
        public async Task<IActionResult> SubmitAnswer(AnswerViewModel answer)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            //TODO: check the clock

            if (!takeExamRepository.FillAnswer(answer, User.FindFirstValue(ClaimTypes.NameIdentifier)))
                return BadRequest();

            if (!await takeExamRepository.SaveChangesAsync())
                return BadRequest();

            return Ok();
        }

        [Authorize]
        [HttpPut("WriteAllAnswers/{ExamId}")]
        public async Task<IActionResult> SubmitAllAnswers(AnswersViewModel answers, string ExamId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            //TODO: check the clock

            if (!takeExamRepository.FillAllAnswers(answers, ExamId,
                User.FindFirstValue(ClaimTypes.NameIdentifier)))

                return BadRequest();

            if (!await takeExamRepository.SaveChangesAsync())
                return BadRequest();

            return Ok();
        }

    }
}
