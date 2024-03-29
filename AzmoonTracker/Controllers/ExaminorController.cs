﻿using AzmoonTracker.Services.ExamRepository;
using AzmoonTracker.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AzmoonTracker.Controllers
{
    [Route("api/Exam")]
    [ApiController]
    public class ExaminorController : ControllerBase
    {
        private readonly IExamRepository examRepository;

        public ExaminorController(IExamRepository _examRepository)
        {
            examRepository=_examRepository;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAllExams()
        {
            return Ok(examRepository.GetAllExams());
        }

        [HttpGet("Get/{ExamId}")]
        public IActionResult GetExam(String ExamId)
        {
            ExamViewModel examView = examRepository.GetExam(ExamId);
            if (examView == null)
                return NotFound();
            else
                return Ok(examView);
        }

        [Authorize]
        [HttpPost("Create/")]
        public async Task<IActionResult> CreateExam(ExamViewModel examView)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                if(!examRepository.CreateExam(examView,User.FindFirstValue(ClaimTypes.NameIdentifier)))
                {
                    return BadRequest();
                }
            }

            if (! await examRepository.SaveChangesAsync())
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
                //or return notfound();?
            }

            return Ok();
        }

        [Authorize]
        [HttpPut("Update/{ExamId}")]
        public async Task<IActionResult> UpdateExamAsync(ExamViewModel examView, String ExamId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                if(!examRepository.UpdateExam(examView, ExamId, User.FindFirstValue(ClaimTypes.NameIdentifier)))
                {
                    return BadRequest();
                }
            }

            if (!await examRepository.SaveChangesAsync())
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
                //or return notfound();?
            }
            return Ok();
        }

        [Authorize]
        [HttpDelete("Delete/{ExamId}")]
        public async Task<IActionResult> DeleteExamAsync(String ExamId)
        {
            if(!examRepository.DeleteExam(ExamId))
            {
                return NotFound();
            }

            if (!await examRepository.SaveChangesAsync())
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
                //or return notfound();?
            }
            return Ok();
        }

        [HttpGet("Search")] 
        public IActionResult SearchExams(string searchString)
        {
            //searchString is not identified in route, so it's called as query
            //i.e. api/Exam/Search?searchString=Exam&...

            return Ok(examRepository.SearchExams(searchString));
        }

        [Authorize]
        [HttpGet("GetParticipants/{ExamId}")]
        public IActionResult GetExamParticipants(string ExamId)
        {
            List<ParticipantViewModel> participants = examRepository.GetParticipants(ExamId);
            if (participants == null)
                return NotFound();
            else return Ok(participants);
        }

        [Authorize]
        [HttpGet("GetExamAnswer/{ExamId}/{ParticipantId}")]
        public IActionResult GetParticipantAnswers(string ExamId, string ParticipantId)
        {
            AnswersViewModel Answers = examRepository.GetAnswers(ExamId, ParticipantId);
            //check if the user actually takes the exam

            if (Answers == null)
                return NotFound();
            else 
                return Ok(Answers);
        }
    }
}
