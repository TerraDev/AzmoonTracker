using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AzmoonTracker.ViewModels
{
    public class AnswersViewModel
    {
        public string ExamName { get; set; }

        public string UserName { get; set; }

        [Required]
        public List<AnswerViewModel> Answers { get; set; }
    }
}
