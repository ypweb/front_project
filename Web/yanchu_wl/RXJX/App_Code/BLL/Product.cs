using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
	/// <summary>
	/// ҵ���߼���Product ��ժҪ˵����
	/// </summary>
	public class Product
	{
        private readonly CSYC.DAL.Product dal = new CSYC.DAL.Product();
		public Product()
		{}
		#region  ��Ա����
		/// <summary>
		/// ����һ������
		/// </summary>
        public int Add(CSYC.Model.Product model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// ����һ������
		/// </summary>
        public int Update(CSYC.Model.Product model)
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
        public CSYC.Model.Product GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

			/// <summary>
		/// ��������б�
		/// </summary>
        public DataSet GetList(int TypeID, int ProductType, int Count, int IsShow)
		{
            return dal.GetList(TypeID, ProductType, Count, IsShow);
		}
        public DataSet GetList()
        {
            return dal.GetList();
        }
        public DataSet GetListC(int count)
        {
            return dal.GetListC(count);
        }

        /// <summary>
        /// ��ID��ȡ������
        /// </summary>
        /// <param name="TypeID"></param>
        /// <returns></returns>
        public int GetCount(int TypeID) 
        {
            return dal.GetCount(TypeID);
        }

        /// <summary>
        /// ��һҳ
        /// </summary>
        /// <returns></returns>
        public DataSet GetS(int ID)
        {
            return dal.GetS(ID);
        }

        /// <summary>
        /// ��һҳ
        /// </summary>
        /// <returns></returns>
        public DataSet GetX(int ID)
        {
            return dal.GetX(ID);
        }
        /// <summary>
        /// ��������ѯͼƬ�б�
        /// </summary>
        public DataSet GetList(int current, int count, int TypeID)
        {
            return dal.GetList(current, count, TypeID);
        }
		#endregion  ��Ա����
	}
}

