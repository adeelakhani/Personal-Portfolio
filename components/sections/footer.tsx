export default function Footer() {
    return (
      <footer className="flex flex-col items-center justify-center text-center p-6 border-t-2 border-white text-white">
        <p className="text-md">
          Made with ❤️ using <a href="https://nextjs.org/" className="text-blue-400 hover:underline">Next.js</a>
        </p>
        <div className="flex gap-4 mt-2">
          <a href="https://github.com/adeelakhani" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/adeelakhani/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            LinkedIn
          </a>
          <a href="mailto:aakhani@uwaterloo.ca" className="hover:text-blue-500">
            Contact
          </a>
        </div>
        <p className="text-xs opacity-70 mt-3">&copy; {new Date().getFullYear()} Adeel Akhani. All rights reserved.</p>
      </footer>
    );
  }
  