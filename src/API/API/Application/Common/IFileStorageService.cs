using System;
using System.IO;
using System.Threading.Tasks;

namespace API.Application.Common
{
    public interface IFileStorageService
    {
        public Task<string> Upload(Guid id, string inputFileName, Stream file);
    }
}
