using ECWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ECWebAPI.Controllers
{
    [EnableCorsAttribute(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class ProductController : ApiController
    {
        Entities db =new Entities();


        //Get 
        public IEnumerable<Product_Table> Get()
        {
            
            return db.Products.ToList();
        }

        //Post
        public string Post(Product_Table product)
        {
            db.Products.Add(product);
            db.SaveChanges();
            return "Product Added";
        }

        //Get Single Product
        public Product_Table Get(string id)
        {
            Product_Table product =  db.Products.Find(id);
            return product;
        }

        //PUT 
        public string Put(string id, Product_Table product)
        {
            var product_ = db.Products.Find(id);
            product_.name = product.name;
            product_.desc = product.desc;
            product_.price = product.price;
            product_.rating = product.rating;
            product_.company_name = product.company_name;
            product_.category = product.category; 
            product_.quantity = product.quantity;
            product_.img = product.img;
            product_.date = product.date;
            product_.delivery = product.delivery;

            db.Entry(product_).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return "Product Updated";
        }


        //Delete Product
        public string Delete(string id)
        {
            Product_Table product =db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return "Deleted Successfully";
        }
    }
}
