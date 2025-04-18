import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Open Galaxy</h3>
                        <p className="text-gray-400 text-sm">
                            Managing open source projects efficiently.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/manage-project" className="text-gray-400 hover:text-white">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/Add-project" className="text-gray-400 hover:text-white">
                                    Add Project
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-gray-400 text-sm">
                            Email: admin@opengalaxy.com<br />
                            Phone: (555) 123-4567
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} Open Galaxy. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;