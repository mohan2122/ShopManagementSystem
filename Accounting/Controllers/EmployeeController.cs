using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Net.Http.Headers;
using System.Web.Hosting;
using Repository;


namespace Accounting.Controllers
{
    public class EmployeeController : ApiController
    {
        //ADO.NET EF object

        eBusinessEntities objContext;
        public EmployeeController()
        {
            objContext = new eBusinessEntities();
        }

        /// <summary>
        /// Method for
        /// 1. Read the ByteArray from Sql Server Database
        /// 2. Convert the Byte Array into Bitmap.
        /// 3. Save the file on the server using FileStream object.
        /// 4. Get the Image object from FileStream
        /// 5. Save the Image object into MemoryStream
        /// 6. The MemoryStream is passed into the HttpResponse in Http Content based byte Array using ByteArrayContent object
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public HttpResponseMessage GetImage(int Id)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            
            //1
            var Emp = (from e in objContext.ProductInfoes
                       where e.ProductID == Id
                       select e).First();

            //2
            TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(Bitmap));
            Bitmap bmp = (Bitmap)typeConverter.ConvertFrom(Emp.ProductImage);

            //3
            var Fs = new FileStream(HostingEnvironment.MapPath("~/Images") + @"\I" + Id.ToString() + ".png", FileMode.Create);
            bmp.Save(Fs, ImageFormat.Png);
            bmp.Dispose();

            //4
            Image img = Image.FromStream(Fs);
            Fs.Close();
            Fs.Dispose();

            //5
            MemoryStream ms = new MemoryStream();
            img.Save(ms, ImageFormat.Png);

            //6
            response.Content = new ByteArrayContent(ms.ToArray());
            ms.Close();
            ms.Dispose();

            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
            response.StatusCode = HttpStatusCode.OK;

            return response;
        }

    }
}