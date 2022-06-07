using ECWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ECWebAPI.Controllers
{
    public class CartController : ApiController
    {
        CartEntities db = new CartEntities();

        public string Post(Cart_Table cart)
        {
            try
            {
                db.Carts.Add(cart);
                db.SaveChanges();
                return "Added Successfully";
            }
            catch (Exception ex)
            {

            return "Failed to Add";
            }
        }

        public IEnumerable<Cart_Table> Get(string Cust_ID)
        {
            try
            {

            IEnumerable<Cart_Table> cart = db.Carts.Where(c => c.Cust_ID == Cust_ID).ToList();
            return cart;
            }
            catch(Exception ex)
            {
                return null;
            }

        }

    }
}
