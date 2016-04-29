using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models
{
	public class UserModel : BaseModel
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string MI { get; set; }
		public string LoginName { get; set; }
		public string Password { get; set; }
		public string Phone { get; set; }
		public string Cell { get; set; }
		public string Website { get; set; }
		public string Email { get; set; }
	}
}