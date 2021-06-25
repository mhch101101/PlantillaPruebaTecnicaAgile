using System;
using System.Collections.Generic;
using System.Text;

using CapaComun.Entidades;

namespace CapaDatos.Interfaces
{
    public interface IUsuarioRepository
    {

        User DevolverObjeto();
        List<User> DevolverLista();

     
    }
}
