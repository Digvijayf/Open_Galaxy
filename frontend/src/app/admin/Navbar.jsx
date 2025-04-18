import Link from "next/link";

const Navbar = () => {
    return (
      <nav className="bg-indigo-600 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold">
              Open Galaxy Admin
            </Link>
            <div className="flex space-x-6">
              <Link href="/admin/manage-task" className="text-white hover:text-indigo-100">Manage Tasks</Link>
              <Link href="/admin/add-project" className="text-white hover:text-indigo-100">
                Add Project
              </Link>
              <Link href="/admin/update-projects" className="text-white hover:text-indigo-100">
                Update Projects
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;