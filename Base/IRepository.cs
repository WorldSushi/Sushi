using System.Linq;

namespace Base
{
    public interface IRepository<T>
    {
        T Get(int id);
        T Create(T obj);
        T Update(T obj);
        void Delete(int id);

        IQueryable<T> All();
    }
}