using ECWebAPI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ECWebAPI.Controllers
{
    [EnableCorsAttribute(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class RegisterController : ApiController
    {
        RegisterEntities db = new RegisterEntities();
        public string Post(Customer_Table customer)
        {
            try
            {
                if (db.Register.Where(c => c.mobile == customer.mobile).Any())
                {
                    return "Mobile already in Use";
                }
                else if(db.Register.Where(c => c.email == customer.email).Any())
                {
                    return "Email already in Use";
                }
                else
                {
                    Customer_Table c = customer;
                    c.password = Encrypt(c.password);
                    db.Register.Add(c);
                    db.SaveChanges();
                    return "Customer Added";
                }
            }
            catch (Exception ex)
            {

            return "Failed to Add";
            }
        }

        //Get customer by id
        public Customer_Table Get(string id)
        {
            Customer_Table customer = db.Register.Find(id);
            return customer;
        }

        public static string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

       
    }
}
