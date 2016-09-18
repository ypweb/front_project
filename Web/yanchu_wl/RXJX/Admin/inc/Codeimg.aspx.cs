using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

using System.Drawing;
using System.Drawing.Imaging;

public partial class SiteServer_inc_Codeimg : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //���ú�������֤������ͼƬ
        this.CreateCheckCodeImage(GenerateCheckCode());
    }

    private string GenerateCheckCode()
    {  //������λ������ַ���
        int number;
        char code;
        string checkCode = String.Empty;

        System.Random random = new Random();

        for (int i = 0; i < 4; i++)
        {
            number = random.Next();
            code = (char)('0' + (char)(number % 10));
            checkCode += code.ToString();
        }
        Session["CheckCode"] = checkCode;//���ڿͻ���У����Ƚ�

        return checkCode;
    }

    private void CreateCheckCodeImage(string checkCode)
    {  //����֤������ͼƬ��ʾ
        if (checkCode == null || checkCode.Trim() == String.Empty)
            return;

        System.Drawing.Bitmap image = new System.Drawing.Bitmap(55, 20);
        Graphics g = Graphics.FromImage(image);

        try
        {
            //������������� 
            Random random = new Random();

            //���ͼƬ����ɫ 
            g.Clear(Color.White);

            //��ͼƬ�ı��������� 
            for (int i = 0; i < 8; i++)
            {
                int x1 = random.Next(image.Width);
                int x2 = random.Next(image.Width);
                int y1 = random.Next(image.Height);
                int y2 = random.Next(image.Height);

                g.DrawLine(new Pen(Color.FromArgb(random.Next(255), random.Next(255), random.Next(255))
                    ), x1, y1, x2, y2);
            }

            StringFormat sf = new StringFormat();
            sf.Alignment = StringAlignment.Center;
            sf.LineAlignment = StringAlignment.Center;

            List<FontStyle> a = GetColorList;
            for (int i = 0; i < checkCode.Length; i++)
            {
                FontStyle Ftyle = GetColor(a);
                Font font = new System.Drawing.Font("Verdana", Ftyle.FontSize, (System.Drawing.FontStyle.Bold));
                SolidBrush brush = new SolidBrush(Ftyle.FontColor);
                g.DrawString(checkCode.Substring(i, 1), font, brush, GetCodeRect(i), sf);
            }
            //��ͼƬ�ı߿��� 
            g.DrawRectangle(new Pen(Color.Silver), 0, 0, image.Width - 1, image.Height - 1);

            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            image.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
            Response.ClearContent();
            Response.ContentType = "image/Gif";
            Response.BinaryWrite(ms.ToArray());
        }
        finally
        {
            g.Dispose();
            image.Dispose();
        }
    }

    /// <summary>
    /// ����ɫ�б������ѡȡ��ɫ
    /// </summary>
    /// <param name="Color_L"></param>
    /// <returns></returns>
    private FontStyle GetColor(List<FontStyle> Color_L)
    {
        Random rnd = new Random();
        int i = rnd.Next(0, Color_L.Count);
        FontStyle l = Color_L[i];
        Color_L.RemoveAt(i);
        return l;
    }

    /// <summary>
    /// ��ȡ��ɫ�б�
    /// </summary>
    private List<FontStyle> GetColorList
    {
        get
        {
            List<FontStyle> a = new List<FontStyle>(4);
            a.Add(new FontStyle(Color.Red, 12));
            a.Add(new FontStyle(Color.Green, 12));
            a.Add(new FontStyle(Color.Blue, 12));
            a.Add(new FontStyle(Color.Black, 12));
            return a;
        }
    }

    /// <summary>
    /// ��ȡ�����ַ��Ļ�������
    /// </summary>
    /// <param name="index">The index.</param>
    /// <returns></returns>
    public Rectangle GetCodeRect(int index)
    {
        // ����һ���ַ�Ӧ�÷����ж��Ļ������򣨵ȷ�ΪCodeLength�ݣ�
        int subWidth = 55 / 4;
        // ������ַ���ߵ�λ��
        int subLeftPosition = subWidth * index;

        return new Rectangle(subLeftPosition + 1, 1, subWidth, 20);
    }
}

/// <summary>
/// ������
/// </summary>
public class FontStyle
{
    /// <summary>
    /// ���캯��
    /// </summary>
    /// <param name="FontColor">��ɫ</param>
    /// <param name="FontSize">�����С</param>
    public FontStyle(Color FontColor, int FontSize)
    {
        _FontColor = FontColor;
        _FontSize = FontSize;
    }
    #region "Private Variables"
    private Color _FontColor;
    private int _FontSize;
    #endregion

    #region "Public Variables"
    /// <summary>
    /// ������ɫ
    /// </summary>
    public Color FontColor
    {
        get
        {
            return _FontColor;
        }
        set
        {
            _FontColor = value;
        }
    }
    /// <summary>
    /// �����С
    /// </summary>
    public int FontSize
    {
        get
        {
            return _FontSize;
        }
        set
        {
            _FontSize = value;
        }
    }
    #endregion
}
