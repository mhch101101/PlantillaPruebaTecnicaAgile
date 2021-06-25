using System;
using System.Collections.Generic;
using System.Text;
using CapaComun.Entidades;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Xml.Linq;

using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using System.Net.Mail;
using System.IO;

namespace CapaComun.Utils
{
    public class Metodos
    {
        public static int Metodo1(int numero)
        {
            return numero++;
        }

    }
}
