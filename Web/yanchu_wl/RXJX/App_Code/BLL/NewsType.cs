using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
	/// <summary>
	/// ҵ���߼���NewsType ��ժҪ˵����
	/// </summary>
	public class NewsType
	{
        private readonly CSYC.DAL.NewsType dal = new CSYC.DAL.NewsType();
		public NewsType()
		{}
		#region  ��Ա����

		/// <summary>
		/// ����һ������
		/// </summary>
        public int Add(CSYC.Model.NewsType model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// ����һ������
		/// </summary>
        public int Update(CSYC.Model.NewsType model)
		{
            return dal.Update(model);
		}

		/// <summary>
		/// ɾ��һ������
		/// </summary>
		public int Delete(int ID)
		{

            return dal.Delete(ID);
		}

		/// <summary>
		/// �õ�һ������ʵ��
		/// </summary>
        public CSYC.Model.NewsType GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}
		/// <summary>
		/// ��������б�
		/// </summary>
        public DataSet GetList(int TypeID)
		{
			return dal.GetList(TypeID);
		}
        public DataSet GetList()
        {
            return dal.GetList();
        }

        public int GetListC(int TypeID) 
        {
            return dal.GetListC(TypeID);
        }
		/// <summary>
		/// ��������б�
		/// </summary>
		//public DataSet GetList(int PageSize,int PageIndex,string strWhere)
		//{
			//return dal.GetList(PageSize,PageIndex,strWhere);
		//}

		#endregion  ��Ա����
	}
}

