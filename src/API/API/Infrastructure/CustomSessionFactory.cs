using Marten;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Infrastructure
{
    public class CustomSessionFactory : ISessionFactory
    {
        private readonly IDocumentStore _store;

        // This is important! You will need to use the
        // IDocumentStore to open sessions
        public CustomSessionFactory(IDocumentStore store)
        {
            _store = store;
        }

        public IQuerySession QuerySession()
        {
            return _store.QuerySession();
        }

        public IDocumentSession OpenSession()
        {
            return _store.DirtyTrackedSession();
        }
    }
}
