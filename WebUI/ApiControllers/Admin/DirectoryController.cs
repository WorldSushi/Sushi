using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.Entities.Table;
using Data.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.ApiControllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class DirectoryController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public DirectoryController(ApplicationContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult GetDirectory()
        {
            List<TableContact> tableContacts = _context.Set<TableContact>().Where(t => DateHelper.IsCurrentMonth(t.Date)).ToList();
            if (tableContacts == null && tableContacts.Count == 0)
            {
                _context.Set<TableContact>().Add(new TableContact()
                {
                    NameTable = "NewTable1",
                    Date = DateTime.Now,
                    TypeDirectory = TypeDirectory.Select,
                    Optins = ""
                });
                _context.Set<TableContact>().Add(new TableContact()
                {
                    NameTable = "NewTable2",
                    Date = DateTime.Now,
                    TypeDirectory = TypeDirectory.Select,
                    Optins = ""
                });
                _context.Set<TableContact>().Add(new TableContact()
                {
                    NameTable = "NewTable3",
                    Date = DateTime.Now,
                    TypeDirectory = TypeDirectory.Select,
                    Optins = ""
                });
                _context.SaveChanges();
                tableContacts = _context.Set<TableContact>().Where(t => DateHelper.IsCurrentMonth(t.Date)).ToList();
            }
            return Ok(tableContacts);
        }

        [HttpGet]
        [Route("Directory")]
        public IActionResult GetDirectoryForClient()
        {
            List<TableContact> tableContacts = _context.Set<TableContact>().Where(t => DateHelper.IsCurrentMonth(t.Date)).ToList();
            List<CellContact> cellContacts = _context.Set<CellContact>().ToList();
            if (tableContacts == null && tableContacts.Count == 0)
            {
                _context.Set<TableContact>().Add(new TableContact()
                {
                    NameTable = "NewTable1",
                    Date = DateTime.Now,
                    TypeDirectory = TypeDirectory.Select,
                    Optins = ""
                });
                _context.Set<TableContact>().Add(new TableContact()
                {
                    NameTable = "NewTable2",
                    Date = DateTime.Now,
                    TypeDirectory = TypeDirectory.Select,
                    Optins = ""
                });
                _context.Set<TableContact>().Add(new TableContact()
                {
                    NameTable = "NewTable3",
                    Date = DateTime.Now,
                    TypeDirectory = TypeDirectory.Select,
                    Optins = ""
                });
                _context.SaveChanges();
                tableContacts = _context.Set<TableContact>().Where(t => DateHelper.IsCurrentMonth(t.Date)).ToList();
            }
            return Ok(tableContacts.Select(z => new TableContact()
            {
                Date = z.Date,
                Id = z.Id,
                NameTable = z.NameTable,
                Optins = z.Optins,
                TypeDirectory = z.TypeDirectory,
                CellContacts = cellContacts.Where(c => c.TableId == z.Id).ToList()
            }));
        }

        [HttpGet]
        [Route("nameTable")]
        public void SetNameTable(int idTable, string nametable)
        {
            TableContact tableContact = _context.Set<TableContact>().FirstOrDefault(t => t.Id == idTable);
            if(tableContact != null)
            {
                tableContact.NameTable = nametable;
                _context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("options")]
        public void SetOptions(int idTable, string options)
        {
            TableContact tableContact = _context.Set<TableContact>().FirstOrDefault(t => t.Id == idTable);
            if (tableContact != null)
            {
                tableContact.Optins = options;
                _context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("type")]
        public void SetType(int idTable, TypeDirectory type)
        {
            TableContact tableContact = _context.Set<TableContact>().FirstOrDefault(t => t.Id == idTable);
            if (tableContact != null)
            {
                tableContact.TypeDirectory = type;
                _context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("data")]
        public void SetData(int idTable, int clientId, string data)
        {
            CellContact cellContact = _context.Set<CellContact>().FirstOrDefault(t => t.TableId == idTable && t.ClientId == clientId);
            if(cellContact != null)
            {
                cellContact.Data = data;
            }
            else
            {
                _context.Set<TableContact>().First(t => t.Id == idTable).CellContacts = new List<CellContact>()
                {
                    new CellContact()
                    {
                        ClientId = clientId,
                        Data = data,
                        DateTime = DateTime.Now,
                        TableId = idTable
                    }
                };
            }
            _context.SaveChanges();
        }
    }
}