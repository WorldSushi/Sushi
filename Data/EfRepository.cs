using Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Data
{
    public class EfRepository<T> : IRepository<T> where T : Entity
    {
        private readonly DbContext _context;

        public EfRepository(DbContext context)
        {
            _context = context;
        }

        private DbSet<T> DbSet => _context.Set<T>();

        public T Get(int id)
        {
            T obj = DbSet.Find(id);

            if (obj == null) throw new Exception(typeof(T) + " is null");

            return obj;
        }

        public T Create(T obj)
        {
            var entity = DbSet.Add(obj).Entity;

            _context.SaveChanges();

            return entity;
        }

        public T Update(T obj)
        {
            var local = _context.Set<T>().Local.FirstOrDefault(x => x.Id == obj.Id);
            if (local != null)
                _context.Entry(local).State = EntityState.Detached;

            _context.Entry(obj).State = EntityState.Modified;

            _context.SaveChanges();

            return Get(obj.Id);
        }

        public void Delete(int id)
        {
            T obj = Get(id);

            DbSet.Remove(obj);

            _context.SaveChanges();
        }

        public IQueryable<T> All()
        {
            return DbSet;
        }
    }
}
