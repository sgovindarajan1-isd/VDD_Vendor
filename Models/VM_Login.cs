using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMaterialPOC.Models
{
    public class VM_Login
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Location { get; set; }
        public bool isValidUser { get; set; }
    }
}