using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRWeb.Infrastructure
{
    public class TwitterConfig
    {
        public string ConsumerKey { get; set; }
        public string ConsumerSecret { get; set; }
        public string UserAccessToken { get; set; }
        public string UserAccessSecret { get; set; }
    }
}
