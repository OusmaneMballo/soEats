using API.Domain;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Application.Photos
{
    public static class Extensions
    {
        public static PhotoDto ProjectToPhotoDto(this Image image)
        {
            return new PhotoDto(image.Id,
                                   image.ImageUrl);
        }
    }


    
}
