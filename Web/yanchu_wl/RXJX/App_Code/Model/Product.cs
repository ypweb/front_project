using System;
namespace CSYC.Model
{
	/// <summary>
	/// ʵ����Product ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	public class Product
	{
		public Product()
		{}
		#region Model
		private int _id;
		private int _typeid;
		private string _productname;
		private string _standards;
		private decimal _sount;
		private decimal _price;
		private string _picurl;
		private DateTime _addtime;
        private string _beiz;
		private string _details;
        private int _isshow;
		/// <summary>
		/// ��Ʒ���
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// �������
		/// </summary>
		public int TypeID
		{
			set{ _typeid=value;}
			get{return _typeid;}
		}
		/// <summary>
		/// ��Ʒ����
		/// </summary>
		public string ProductName
		{
			set{ _productname=value;}
			get{return _productname;}
		}
		/// <summary>
		/// ��Ʒ���
		/// </summary>
		public string Standards
		{
			set{ _standards=value;}
			get{return _standards;}
		}
		/// <summary>
		/// ��Ʒ����
		/// </summary>
        public decimal Sount
		{
			set{ _sount=value;}
			get{return _sount;}
		}
		/// <summary>
		/// ��Ʒ�۸�
		/// </summary>
        public decimal Price
		{
			set{ _price=value;}
			get{return _price;}
		}
		/// <summary>
		/// ��ƷͼƬurl
		/// </summary>
		public string PicUrl
		{
			set{ _picurl=value;}
			get{return _picurl;}
		}
		/// <summary>
		/// ���ʱ��
		/// </summary>
		public DateTime AddTime
		{
			set{ _addtime=value;}
			get{return _addtime;}
		}
		/// <summary>
		/// ��ע
		/// </summary>
		public string Beiz
		{
			set{ _beiz=value;}
			get{return _beiz;}
		}
		/// <summary>
		/// ��Ʒ��ϸ��Ϣ
		/// </summary>
		public string Details
		{
			set{ _details=value;}
			get{return _details;}
		}
        /// <summary>
        /// �Ƿ���ҳ��ʾ
        /// </summary>
        public int IsShow
        {
            set { _isshow = value; }
            get { return _isshow; }
        }
		#endregion Model

	}
}

