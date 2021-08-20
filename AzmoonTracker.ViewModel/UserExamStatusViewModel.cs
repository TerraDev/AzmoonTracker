using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AzmoonTracker.ViewModels
{
    public class UserExamStatusViewModel
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserExamStatus userStatus { get; set; }
    }
}
