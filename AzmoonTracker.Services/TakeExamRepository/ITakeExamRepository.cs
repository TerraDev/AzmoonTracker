using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AzmoonTracker.ViewModels;

namespace AzmoonTracker.Services.TakeExamRepository
{
    public interface ITakeExamRepository
    {
        public bool EnrollExam(string ExamId, string UserId);

        public bool UnenrollExam(string ExamId, string UserId);

        public bool FillAnswer(AnswerViewModel AnswerViewModel, string UserId);

        public bool FillAllAnswers(AnswersViewModel Answers, string ExamId, string UserId);

        public UserExamStatusViewModel GetUserExamStatus(string ExamId, string UserId);
        //public bool ExamHasStarted(string ExamId);

        //public bool ExamHasFinished(string ExamId);
        //public void FinishExam(string ExamId); -->sets Exam.Isfinished field to true

        public Task<bool> SaveChangesAsync();
    }
}
