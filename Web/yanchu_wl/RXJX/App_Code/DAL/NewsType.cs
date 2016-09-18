using System;
using System.Data;
using System.Text;
using System.Data.OleDb;
using CSYC.Model;//�����������
using CSYC.Oledb;

namespace CSYC.DAL
{
	/// <summary>
	/// ���ݷ�����NewsType��
	/// </summary>
	public class NewsType
	{
		public NewsType()
		{}
		#region  ��Ա����

		/// <summary>
		/// ����һ������
		/// </summary>
        public int Add(CSYC.Model.NewsType model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into NewsType(");
            strSql.Append("TypeName,ParentID)");
			strSql.Append(" values (");
            strSql.Append("@TypeName,@ParentID)");
            OleDbParameter[] parameters = {
					new OleDbParameter("@TypeName", OleDbType.VarChar,50),
                    new OleDbParameter("@ParentID",OleDbType.Integer)};
			parameters[0].Value = model.TypeName;
            parameters[1].Value = model.ParentID;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
		}
		/// <summary>
		/// ����һ������
		/// </summary>
        public int Update(CSYC.Model.NewsType model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update NewsType set ");
            strSql.Append("TypeName=@TypeName");
			strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@TypeName", OleDbType.VarChar,50),
            		new OleDbParameter("@ID", OleDbType.Integer,4)};
			parameters[0].Value = model.TypeName;
            parameters[1].Value = model.ID;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
		}

		/// <summary>
		/// ɾ��һ������
		/// </summary>
		public int Delete(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from NewsType ");
            strSql.Append(" where ID=@ID");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
			parameters[0].Value = ID;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery( strSql.ToString(), parameters);
            return rs;
		}


		/// <summary>
		/// �õ�һ������ʵ��
		/// </summary>
        public CSYC.Model.NewsType GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select top 1 ID,TypeName,ParentID from NewsType ");
			strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
			parameters[0].Value = ID;

            CSYC.Model.NewsType model = new CSYC.Model.NewsType();
            DataSet ds = Oldb.ExecuteDataset( strSql.ToString(), parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				if(ds.Tables[0].Rows[0]["ID"].ToString()!="")
				{
					model.ID=int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
				}
				model.TypeName=ds.Tables[0].Rows[0]["TypeName"].ToString();
                if (ds.Tables[0].Rows[0]["ParentID"].ToString() != "")
                {
                    model.ParentID = int.Parse(ds.Tables[0].Rows[0]["ParentID"].ToString());
                }
				return model;
			}
			else
			{
				return null;
			}
		}

		/// <summary>
		/// ��������б�
		/// </summary>
        public DataSet GetList(int TypeID)
		{
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select ID,TypeName,ParentID ");
            strSql.Append(" FROM NewsType where 1=1 and ParentID=@TypeID");

            OleDbParameter[] parameters ={ 
                new OleDbParameter("@TypeID", OleDbType.Integer, 4)};
            parameters[0].Value = TypeID;

            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
		}
        /// <summary>
        /// ��������б�
        /// </summary>
        public DataSet GetList()
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,TypeName,ParentID ");
            strSql.Append(" FROM NewsType where 1=1");
            return Oldb.ExecuteDataset(strSql.ToString());
        }

        public int GetListC(int TypeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(-1) ");
            strSql.Append(" FROM NewsType where 1=1 and ParentID=@TypeID");
            OleDbParameter[] parameters ={
                new OleDbParameter("@ParentID",TypeID)};
            int count = (int)Oldb.ExecuteScalar(strSql.ToString(), parameters);
            return count;
        }
		#endregion  ��Ա����
	}
}

