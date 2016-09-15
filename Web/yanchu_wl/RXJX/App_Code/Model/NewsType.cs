using System;
namespace CSYC.Model
{
	/// <summary>
	/// ʵ����NewsType ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
	/// </summary>
	public class NewsType
	{
		public NewsType()
		{}
		#region Model
		private int _id;
		private string _typename;
        private int parentid;
        private int _rootid;
		/// <summary>
		/// ���
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// �����
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
        public int RootID
        {
            set { _rootid = value; }
            get { return _rootid; }
        }
		#endregion Model

	}
}

