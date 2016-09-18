using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
	/// <summary>
	/// ҵ���߼���News ��ժҪ˵����
	/// </summary>
	public class News
	{
        private readonly CSYC.DAL.News dal = new CSYC.DAL.News();
		public News()
		{}
		#region  ��Ա����

		/// <summary>
		/// ����һ������
		/// </summary>
        public int Add(CSYC.Model.News model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// ����һ������
		/// </summary>
        public int Update(CSYC.Model.News model)
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
        public CSYC.Model.News GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

		/// <summary>
		/// ��������б�
		/// </summary>
        public DataSet GetList(int TypeID, int ProductType, int Count, int IsHome)
		{
            return dal.GetList(TypeID,ProductType, Count, IsHome);
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
        /// ��ID��ȡ������
        /// </summary>
        /// <param name="TypeID"></param>
        /// <returns></returns>
        public int GetCount(int TypeID) 
        {
            return dal.GetCount(TypeID);
        }

        /// <summary>
        /// �������
        /// </summary>
        public int viewhit(int ID) 
        {
            return dal.viewhit(ID);
        }
        /// <summary>
        /// ��������ѯ�����б�
        /// </summary>
        public DataSet GetList(int current, int count, int TypeID)
        {
            return dal.GetList(current, count, TypeID);
        }
		#endregion  ��Ա����
	}
}

