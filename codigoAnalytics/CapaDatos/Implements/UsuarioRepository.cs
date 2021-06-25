using System;
using System.Collections.Generic;
using System.Text;
using CapaDatos.Interfaces;
using Dapper;
using System.Data;
using CapaComun.Entidades;
using Microsoft.Extensions.Configuration;

namespace CapaDatos.Implements
{
    public class UsuarioRepository : BaseRepository, IUsuarioRepository
    {

        public UsuarioRepository(IConfiguration _configuration): base(_configuration)
        {
        }

        public User DevolverObjeto()
        {
            var p = new DynamicParameters();
            //parametros
            //p.Add("@nomPara1", enteros DbType.Int32, ParameterDirection.Input);
            //p.Add("@nomPara2", cadenaTextos, DbType.String, ParameterDirection.Input);
            //p.Add("@nomPara3", fecha, DbType.DateTime, ParameterDirection.Input);
            return Get<User>(StoredProcedures.NomPA1, p);
        }

        public List<User> DevolverLista()
        {
            var p = new DynamicParameters();
            //parametros de procedimiento
            //p.Add("@nomPara1", enteros DbType.Int32, ParameterDirection.Input);
            //p.Add("@nomPara2", cadenaTextos, DbType.String, ParameterDirection.Input);
            //p.Add("@nomPara3", fecha, DbType.DateTime, ParameterDirection.Input);
            return List<User>(StoredProcedures.NomPA1, p);
        }


    }
}
