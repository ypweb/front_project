using System;
namespace CSYC.Model
{
	/// <summary>
	/// ʵ����ProductType ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	public class ProductType
	{
		public ProductType()
		{}
		#region Model
		private int _id;
		private string _typename;
        private int parentid;
		/// <summary>
		/// ��Ʒ�����
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// ��Ʒ�������
		/// </summary>
		public string TypeName
		{
			set{ _typename=value;}
			get{return _typename;}
		}
        /// <summary>
        /// ������
        /// </summary>
        public int ParentID
        {
            set { parentid = value; }
            get { return parentid; }
        }
		#endregion Model

	}
}

