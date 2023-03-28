using API.Application.Common;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Web;

namespace API.Infrastructure
{
    public class AzureStorageAccountService : IFileStorageService
    {
        private readonly IConfiguration _configuration;

        public AzureStorageAccountService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> Upload(Guid id, string inputFileName, Stream file)
        {
            BlobServiceClient blobServiceClient = new BlobServiceClient(_configuration.GetConnectionString("StorageAccount"));
            string containerName = "images";
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            var fileName = $"{Path.GetRandomFileName()}{Path.GetExtension(inputFileName)}";
            string blobFileName = $@"{id}/{fileName}";
            BlobClient blobClient = containerClient.GetBlobClient(blobFileName);
            await blobClient.UploadAsync(file, true);
            return HttpUtility.UrlDecode(blobClient.Uri.AbsoluteUri);
        }
    }
}
