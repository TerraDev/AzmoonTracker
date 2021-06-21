using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AzmoonTracker.ViewModels
{
    public class AnswerViewModel
    {
        [MaxLength(30)]
        public string ExamId { get; set; }

        public int QuestionId { get; set; }

        //public int UserId??
        public string AnswerText { get; set; }
    }
}
