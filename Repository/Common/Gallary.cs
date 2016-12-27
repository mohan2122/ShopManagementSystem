using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Repository
{
    public class Gallary
    {
        eBusinessEntities db = new eBusinessEntities();
        public void SavePlayerImage(ProductInfo playerImage)
        {
            byte[] imageBytes = ConvertToBytes(playerImage.File);
            playerImage.ProductImage = imageBytes;
            db.ProductInfoes.Add(playerImage);
            db.SaveChanges();
        }
        public byte[] ConvertToBytes(HttpPostedFileBase Image)
        {
            byte[] imageBytes = null;
            BinaryReader reader = new BinaryReader(Image.InputStream);
            imageBytes = reader.ReadBytes((int)Image.ContentLength);
            return imageBytes;
        }
    }
}