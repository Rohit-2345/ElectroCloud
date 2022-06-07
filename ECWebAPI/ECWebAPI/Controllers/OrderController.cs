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
    public class OrderController : ApiController
    {
        //OrdersEntities db = new OrdersEntities();
        DBOrdersEntities db = new DBOrdersEntities();
        public string Post(Order_Table order)
        {
            try
            {

            db.DBOrder.Add(order);
            db.SaveChanges();
                return "Order Added";
            }catch (Exception ex)
            {
                
                return "Failed to Add";
            }
        }

        public IEnumerable<Order_Table> Get(string Cust_ID)
        {
            IEnumerable<Order_Table> orders = db.DBOrder.Where(o => o.Cust_ID == Cust_ID).ToList();
            return orders;
        }
        public IEnumerable<Order_Table> Get()
        {
           return db.DBOrder.ToList();
          
        }


    }
}
