using Microsoft.AspNetCore.Sockets;
using System.Collections.Generic;
using System.IO.Pipelines;

using System.Text;
using System.Threading.Tasks;

namespace SignalRWeb.Endpoints
{
    public class ChatEndpoint : EndPoint
    {  
        public ConnectionList Connections { get; } = new ConnectionList();
        public override async Task OnConnectedAsync(Connection connection)
        {

            Connections.Add(connection);
            try
            {                
                while (await connection.Transport.Input.WaitToReadAsync())
                {
                    Message message;
                    if (connection.Transport.Input.TryRead(out message))
                    {                      

                        using (message)
                        {
                            var messageText = $"Anónimo: {Encoding.UTF8.GetString(message.Payload.Buffer.ToArray())}";
                            await Broadcast(messageText);                           
                        }
                    }
                }
            }
            finally
            {
                Connections.Remove(connection);
                
            }
            
        }

        private Task Broadcast(string message)
        {
            var tasks = new List<Task>(Connections.Count);

            var messageBuffer = ReadableBuffer.Create(Encoding.UTF8.GetBytes(message));
            
            foreach (var c in Connections)
            {
                tasks.Add(c.Transport.Output.WriteAsync(
                          new Message(messageBuffer.Preserve(),
                          Format.Text,
                          true)));
            }

            return Task.WhenAll(tasks);
        }
    }
}
