using AzmoonTracker.Infrastacture;
using AzmoonTracker.Models;
using AzmoonTracker.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using AzmoonTracker.Services.TakeExamRepository;

namespace AzmoonTracker.Services.ExamRepository
{
    public class ExamRepository : IExamRepository
    {
        private readonly AppDbContext ctx;
        private readonly UserManager<AppUser> userManager;
        private readonly ITakeExamRepository TexamRepo;

        public ExamRepository(AppDbContext _ctx, UserManager<AppUser> _userManager
            , ITakeExamRepository _TexamRepo
            )
        {
            ctx = _ctx;
            userManager = _userManager;
            TexamRepo = _TexamRepo;
        }

        public ICollection<ExamViewModel> GetAllExams()
        {
            ICollection<ExamViewModel> examViews = new List<ExamViewModel>();
            foreach (Exam exam in ctx.Exams)
            {
                examViews.Add(new ExamViewModel
                {
                    ExamId = exam.ExamId,
                    ExamSearchId = exam.ExamSearchId,
                    ExamName = exam.ExamName,
                    ClassName = exam.ClassName,
                    StartTime = exam.StartTime,
                    EndTime= exam.EndTime,
                    QuestionNum = exam.QuestionNum,
                    IsFinished = exam.IsFinished,
                    IsPublic = exam.IsPublic
                });
            }
            return examViews;
        }

        public ExamViewModel GetExam(string examId)
        {
            Exam exam = ctx.Exams.Find(examId);

            if (exam == null)
                return null;

            ICollection<QuestionViewModel> questionViews = new List<QuestionViewModel>();
            foreach (Question Quest in exam.Questions)
            {
                ICollection<ChoiceViewModel> choiceViews = new List<ChoiceViewModel>();
                foreach (Choice choice in Quest.Choices)
                {
                    choiceViews.Add(new ChoiceViewModel
                    {
                        ChoiceDescription = choice.ChoiceDescription,
                        ChoiceNum = choice.ChoiceNum,
                        IsCorrect = choice.IsCorrect
                    });
                }
                questionViews.Add(new QuestionViewModel
                {
                    QuestionDescription = Quest.QuestionDescription,
                    QuestionNum = Quest.QuestionNum,
                    QuestionTypeId = Quest.TypeId,
                    Choices = choiceViews
                });
            }

            ExamViewModel examView = new ExamViewModel
            {
                ExamId = examId,
                ExamSearchId = exam.ExamSearchId,
                ExamName = exam.ExamName,
                ClassName = exam.ClassName,
                QuestionNum = exam.QuestionNum,
                StartTime = exam.StartTime,
                EndTime = exam.EndTime,
                IsFinished = exam.IsFinished,
                IsPublic = exam.IsPublic,
                Questions = questionViews
            };
            return examView;
        }

        public bool CreateExam(ExamViewModel examView, string creatorId)
        {
            ICollection<Question> questions = new List<Question>();
            foreach (QuestionViewModel Quest in examView.Questions)
            {
                ICollection<Choice> choices = new List<Choice>();
                Question nextQuestion = new Question();
                foreach (ChoiceViewModel ch in Quest.Choices)
                {
                    choices.Add(
                    new Choice
                    {
                        //ExamId = examView.ExamId,
                        //QuestionId = Quest.QuestionNum,
                        ChoiceDescription = ch.ChoiceDescription,
                        ChoiceNum = ch.ChoiceNum,
                        IsCorrect = ch.IsCorrect,
                        Question= nextQuestion
                    });
                }

                //nextQuestion.Exam = exam;
                nextQuestion.QuestionDescription = Quest.QuestionDescription;
                nextQuestion.QuestionNum = Quest.QuestionNum;
                nextQuestion.TypeId = Quest.QuestionTypeId;
                //nextQuestion.Choices = choices;
                questions.Add(nextQuestion);
            }

            Exam exam = new Exam()
            {
                CreatorId = creatorId,
                ClassName = examView.ClassName,
                ExamId = examView.ExamId, 
                ExamSearchId = examView.ExamSearchId,
                ExamName = examView.ExamName,
                StartTime = examView.StartTime,
                EndTime = examView.EndTime,
                IsPublic = examView.IsPublic,
                IsFinished = examView.IsFinished,
                QuestionNum = examView.QuestionNum,
                Questions = questions,
            };

            ctx.Exams.Add(exam);
            //do we also add the questions and choices?
            //Answer is no. it is added automatically via the one line above

            return true;//check
        }

        public bool UpdateExam(ExamViewModel examView, string ExamId, string creatorId)
        {
            List<string> participantIds =
                ctx.UsersParticipateInExams.Where(o => o.ExamFK == ExamId)
                .Select(o=>o.ParticipantFK).ToList();

            this.DeleteExam(ExamId);
            ctx.SaveChanges();
            this.CreateExam(examView,creatorId);
            ctx.SaveChanges();

            foreach(string participantId in participantIds)
            {
                TexamRepo.EnrollExam(examView.ExamId, participantId);
            }
            return true;
        }

        public ICollection<ExamViewModel> SearchExams(string searchString)
        {
            List<Exam> exams = ctx.Exams.Where(o => o.ExamSearchId.ToLower()
            .Contains(searchString.ToLower())).ToList();

            ICollection<ExamViewModel> examViews = new List<ExamViewModel>();
            foreach (Exam exam in exams)
            {
                examViews.Add(new ExamViewModel
                {
                    ExamId = exam.ExamId,
                    ExamSearchId = exam.ExamSearchId,
                    ExamName = exam.ExamName,
                    ClassName = exam.ClassName,
                    StartTime = exam.StartTime,
                    EndTime = exam.EndTime,
                    QuestionNum = exam.QuestionNum,
                    IsFinished = exam.IsFinished,
                    IsPublic = exam.IsPublic
                });
            }
            return examViews;
        }

        public bool DeleteExam(string examId)
        {
            ctx.Exams.Remove(ctx.Exams.Find(examId));
            return true;
        }

        public AnswersViewModel GetAnswers(string examId, string UserId)
        {
            UserParticipateInExam participant = ctx.UsersParticipateInExams.Where(o => o.ExamFK == examId && o.ParticipantFK == UserId).FirstOrDefault();
            if (participant == null) 
                return null;

            List<Answer> anss = ctx.Answers.Where(o => o.ExamParticipant == participant).ToList();
            List<AnswerViewModel> RetAnswers = new List<AnswerViewModel>();
            foreach (Answer ans in anss)
            {
                RetAnswers.Add(
                new AnswerViewModel
                {
                    AnswerText=ans.AnswerText,
                    //ExamId=ans.ExamId,
                    QuestionId=ans.QuestionId
                });
            }

            AnswersViewModel AnsVM = new AnswersViewModel();

            AnsVM.UserName = ctx.AppUsers.Where(o => o.Id == UserId).FirstOrDefault().UserName;
            AnsVM.ExamName = ctx.Exams.Where(o => o.ExamId == examId).FirstOrDefault().ExamName;
            AnsVM.Answers = RetAnswers;

            return AnsVM;
        }

        public  List<ParticipantViewModel> GetParticipants(string examId)
        {
            List<string> ParicipantIds = ctx.UsersParticipateInExams.Where(o => o.ExamFK == examId)
                .Select(o => o.ParticipantFK).ToList();
            if (ParicipantIds == null) return null;

            List<ParticipantViewModel> participants = new List<ParticipantViewModel>();
            foreach (string Pid in ParicipantIds)
            {
                //discriminator field in database should be set to "AppUser" for this to work
                AppUser aUser = ctx.AppUsers.FirstOrDefault(o => o.Id == Pid);
                participants.Add(new ParticipantViewModel
                {
                    UserId = aUser.Id,
                    Username = aUser.UserName,
                });
            }
            return participants;
        }

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
