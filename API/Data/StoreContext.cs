using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>().HasData(
            new IdentityRole { Name = "Member", NormalizedName = "MEMBER", Id = "640be9bb-2351-4003-a937-1a74ecd28e0d", ConcurrencyStamp = "Member" },
            new IdentityRole { Name = "Admin", NormalizedName = "ADMIN", Id = "8d352134-ed51-4314-92bd-b6ac629cde1c", ConcurrencyStamp = "Admin" }
        );


    }

}
