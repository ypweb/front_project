using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
	/// <summary>
	/// ҵ���߼���ProductType ��ժҪ˵����
	/// </summary>
	public class ProductType
	{
        private readonly CSYC.DAL.ProductType dal = new CSYC.DAL.ProductType();
		public ProductType()
		{}
		#region  ��Ա����

        public int Exists(string TypeName, out int TypeID)
        {
            return dal.Exists(TypeName, out TypeID);
        }
		/// <summary>
		/// ����һ������
		/// </summary>
        public int Add(CSYC.Model.ProductType model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// ����һ������
		/// </summary>
        public int Update(CSYC.Model.ProductType model)
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
        public CSYC.Model.ProductType GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}
		/// <summary>
		/// ��������б�
		/// </summary>
        public DataSet GetList(string key, int TypeID, int selectTpye, out int records)
		{
			return dal.GetList(key, TypeID,  selectTpye, out  records);
		}
        /// <summary>
        /// ��������б�
        /// </summary>
        public DataSet GetList(int TypeID)
        {
            return dal.GetList(TypeID);
        }

        public int GetListC(int TypeID) 
        {
            return dal.GetListC(TypeID);
        }


		#endregion  ��Ա����
	}
}

