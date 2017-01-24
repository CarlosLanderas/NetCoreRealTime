using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRWeb.Infrastructure
{
    public interface ITwitterStreamManager
    {
        void StartStream(string track);
        void StopStream();    

    }
}
