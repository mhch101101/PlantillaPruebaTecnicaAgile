using System;
using Dapper;
using System.Collections.Generic;
using System.Text;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using CapaComun;
using System.Linq;
using Microsoft.Extensions.Configuration;
using CapaComun.Entidades;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CapaDatos.Implements
{
    public class BaseRepository
    {
        public string CadenaConexion { get; set; }

        public IConfiguration configuration { get; set; }

        protected BaseRepository(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        

        protected SqlConnection OpenConnection()
        {
            CadenaConexion = configuration["ConnectionStrings:Default"];
            var connection = new SqlConnection();
            connection.ConnectionString = CadenaConexion;
            return connection;
        }

        protected void Execute(string procedimiento, DynamicParameters parametros)
        {
            using (SqlConnection conn = OpenConnection())
            {
                conn.Open();
                conn.Execute(procedimiento, parametros, commandType: CommandType.StoredProcedure);
            }
        }

        protected T Get<T>(string procedimiento, DynamicParameters parametros)
        {
            using (SqlConnection conn = OpenConnection())
            {
                conn.Open();
                return conn.Query<T>(procedimiento, parametros,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }

        protected List<T> List<T>(string procedimiento, DynamicParameters parametros) where T : class
        {
            using (SqlConnection conn = OpenConnection())
            {
                conn.Open();
                return conn.Query<T>(procedimiento, parametros, commandType: CommandType.StoredProcedure,
                    buffered: true, commandTimeout: 240)
                    .ToList();
            }
        }




    }
}
