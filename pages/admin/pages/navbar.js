import Layout from '../../../adminComponents/AdminLayout';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import NavItem from '../../../models/NavItem';
import Router from 'next/router';
import connectDb from '../../../middleware/mongoose';

const NavItems = ({ navItems }) => {
  const handleDelete = async (collection, id) => {
    const res = await fetch(`/api/deleteApi?collection=${collection}&id=${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
  
    if (res.ok) {
      console.log(data.message);
      Router.push('/admin/pages/navbar');
    } else {
      console.error(data.message);
    }
  };
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Navbar</h1>
        <Link href="/admin/pages/add/addNav">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add NavItem
          </button>
        </Link>

        <div className='overflow-x-auto'>

        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">NavItems</th>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {navItems.map((nav) => (
              <tr key={nav._id}>
                <td className="border px-4 py-2">{nav.position}</td>
                <td className="border px-4 py-2">{nav.name}</td>
                <td className="border px-4 py-2">
                  {nav.slug}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href="/admin/updateNav/[nav]" 
                    as={`/admin/updateNav/${nav._id}`}
                  >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete('navItems', nav._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context){
    await connectDb();
  
    let navItems = await NavItem.find().sort({position: 1});

   return {
      props: {
          navItems: JSON.parse(JSON.stringify(navItems)),
      },
    }
}

export default NavItems;
{/* <script>

{{!-- let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
} --}}


let navItems = document.querySelectorAll('.nav li')
var prevItem
var subItems = [];
for (var i = 0; i < navItems.length; i++) {
  let item = navItems[i]
  let label = item.children[0].innerHTML
  if (label.indexOf('--') == 0) {
    subItems.push({
      link: item.innerHTML,
      classes: item.classList
    })
  } else {
    if (subItems.length > 0) {
      // Append list to previous item
      let subNavHTML = '<span class="nav-trigger">▼</span><ul class="nav">'
      for (var j = 0; j < subItems.length; j++) {
        subNavHTML += '<li class="' + subItems[j].classes + '">' + subItems[j].link.replace('-- ', '') + '</li>'
        document.querySelector('.nav .' + subItems[j].classes[0]).remove() // delete original link
      }
      subNavHTML += '</ul>'
      prevItem.innerHTML += subNavHTML
      prevItem.classList.remove('nav-current')
      prevItem.classList.add('subnav')
      prevItem.classList.add('nav-wrapper')
      prevItem.firstChild.addEventListener('click', function(e) {e.preventDefault()
      })

    }
    // Reset
    prevItem = item
    subItems = []
  }
}
</script> */}
