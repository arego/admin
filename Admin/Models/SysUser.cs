using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Admin.Models
{
	public class SysUser : UserModel
	{
		public string File { get; set; }
		public bool Gender { get; set; }
		public bool IsProfitA { get; set; }
		public bool IsProfitB { get; set; }
		public bool IsProfitC { get; set; }
	}
}