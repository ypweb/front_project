using System;
namespace CSYC.Model
{
    /// <summary>
    /// ʵ����News ��(����˵���Զ���ȡ���ݿ��ֶε�������Ϣ)
    /// </summary>
    public class News
    {
        public News()
        { }
        #region Model
        private int _id;
        private int _typeid;
        private int _userid;
        private string _title;
        private string _linkurl;
        private DateTime _createtime;
        private string _picurl;
        private string _contents;
        private string _source;
        private int _viewcount;
        private int _ishome;
        /// <summary>
        /// ���
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// �����
        /// </summary>
        public int TypeID
        {
            set { _typeid = value; }
            get { return _typeid; }
        }
        /// <summary>
        /// �û����
        /// </summary>
        public int UserID
        {
            set { _userid = value; }
            get { return _userid; }
        }
        /// <summary>
        /// ���ű���
        /// </summary>
        public string Title
        {
            set { _title = value; }
            get { return _title; }
        }
        /// <summary>
        /// ��������·��
        /// </summary>
        public string LinkUrl
        {
            set { _linkurl = value; }
            get { return _linkurl; }
        }
        /// <summary>
        /// �������ʱ��
        /// </summary>
        public DateTime CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        /// <summary>
        /// ͼƬURl
        /// </summary>
        public string PicUrl
        {
            set { _picurl = value; }
            get { return _picurl; }
        }
        /// <summary>
        /// ��������
        /// </summary>
        public string Contents
        {
            set { _contents = value; }
            get { return _contents; }
        }
        /// <summary>
        /// ��Դ
        /// </summary>
        public string Source
        {
            set { _source = value; }
            get { return _source; }
        }
        /// <summary>
        /// �������
        /// </summary>
        public int ViewCount
        {
            set { _viewcount = value; }
            get { return _viewcount; }
        }
        public int IsHome
        {
            set { _ishome = value; }
            get { return _ishome; }
        }
        #endregion Model

    }
}

