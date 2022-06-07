using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ECWebAPI.Models;

namespace ECWebAPI.Controllers
{
    [EnableCorsAttribute(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class WishlistController : ApiController
    {
        WishlistEntities db = new WishlistEntities();

        public string Post(Wishlist_Table wish)
        {
            try
            {
                db.Wishlist.Add(wish);
                db.SaveChanges();

                return ("Added Succefully");
            }

            catch (Exception ex)
            {
                return ("Failed to Add");
            }

        }



            public IEnumerable<Wishlist_Table> Get(string Cust_ID)
            {
                try
                {

                    IEnumerable<Wishlist_Table> wish = db.Wishlist.Where(o => o.Cust_ID == Cust_ID).ToList();
                    return wish;
                }
                catch(Exception ex)
                {
                    return null;
                }
            }
            }
}
