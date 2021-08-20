using AzmoonTracker.Infrastacture;
using AzmoonTracker.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using AzmoonTracker.Models;

namespace AzmoonTracker.Services.TakeExamRepository
{
    public class TakeExamRepository : ITakeExamRepository
    {
        private readonly AppDbContext ctx;

        public TakeExamRepository(AppDbContext _ctx)
        {
            ctx = _ctx;
        }

        public bool EnrollExam(string ExamId, string UserId)
        {
            Exam e= ctx.Exams.Find(ExamId);
            if (e == null)
                return false; //not found

            UserParticipateInExam userParticipateInExam = ctx.UsersParticipateInExams
                .Where(o => o.ExamFK == ExamId && o.ParticipantFK == UserId).FirstOrDefault();

            if (userParticipateInExam != null)
                return false; //bad request

            UserParticipateInExam AddedParticipant = ctx.UsersParticipateInExams.Add(
                new UserParticipateInExam
                {
                    ExamFK = ExamId,
                    ParticipantFK = UserId,
                }).Entity;

            Question[] questions = ctx.Questions.Where(o => o.ExamId == ExamId).ToArray();

            List<Answer> EmptyAnswers = new List<Answer>();
            foreach (Question question in questions)
            {
                EmptyAnswers.Add(
                    new Answer
                    {
                        AnswerText = "",
                        Question=question,
                        ExamParticipant = AddedParticipant
                    });
            }
            ctx.Answers.AddRange(EmptyAnswers);

            return true;
        }

        public bool UnenrollExam(string ExamId, string UserId)
        {
            UserParticipateInExam userParticipateInExam = ctx.UsersParticipateInExams
                .Where(o => o.ExamFK == ExamId && o.ParticipantFK == UserId).FirstOrDefault();

            if (userParticipateInExam == null)
                return false;

            ctx.UsersParticipateInExams.Remove(userParticipateInExam);

            //delete cascading is restricted, so we implement delete ourselves
            Answer[] toDelete = ctx.Answers.Where(o => o.ExamId == ExamId && o.ExamParticipant == userParticipateInExam).ToArray();
            ctx.Answers.RemoveRange(toDelete);

            return true;
        }

        public bool FillAnswer(AnswerViewModel answerViewModel, string UserId)
        {
            UserParticipateInExam part = ctx.UsersParticipateInExams.Where(o => o.ExamFK == answerViewModel.ExamId
            && o.ParticipantFK == UserId).FirstOrDefault();

            if (part == null)
                return false;

            ctx.Answers.Where(o =>
                o.ExamId == answerViewModel.ExamId
                && o.QuestionId == answerViewModel.QuestionId
                && o.ExamParticipant == part)
                .FirstOrDefault().AnswerText = answerViewModel.AnswerText;

            return true;
        }

        public UserExamStatusViewModel GetUserExamStatus(string ExamId, string UserId)
        {
            var userParticipate = ctx.UsersParticipateInExams.Where(o =>
            o.ExamFK == ExamId &&
            o.ParticipantFK == UserId
            ).FirstOrDefault();

            if(userParticipate != null)
            {
                return new UserExamStatusViewModel
                {
                    userStatus = UserExamStatus.Enrolled
                };
            }
            else
            {
                Exam ex = ctx.Exams.Where(o =>
                o.ExamId == ExamId &&
                o.CreatorId == UserId
                ).FirstOrDefault();

                if(ex!=null)
                    return new UserExamStatusViewModel
                    {
                        userStatus = UserExamStatus.Creator
                    };
                else
                    return new UserExamStatusViewModel
                    {
                        userStatus = UserExamStatus.Unenrolled
                    };
            }
        }

        //public bool ExamHasStarted()
        //{
        //    return true;
        //}

        //public bool ExamHasFinished()
        //{
        //    return true;
        //}

        public async Task<bool> SaveChangesAsync()
        {
            if (await ctx.SaveChangesAsync() > 0)
            {
                return true;
            }
            else return false;
        }
    }
}
