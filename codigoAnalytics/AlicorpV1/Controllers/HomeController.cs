using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using alicorp_v1.Models;
using System.ServiceModel;
using System.Net;

using CapaComun.Entidades;
using CapaDatos.Interfaces;
using CapaDatos.Implements;
using Microsoft.Extensions.Configuration;

namespace alicorp_v1.Controllers
{
    public class HomeController : Controller
    {
        private static IConfiguration _configuration;
        IUsuarioRepository repo = new UsuarioRepository(_configuration);

        public HomeController(IUsuarioRepository repo)
        { 
            this.repo = repo;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult MetodoUno(User obj)
        {
            //User rpta = repo.DevolverObjeto();
            return Json(new
            {
                objetoUno = 1,
                objetoDos = 3
            });
        }

    }
}
