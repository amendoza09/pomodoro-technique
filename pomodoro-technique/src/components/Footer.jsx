import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full py-4 md:px-6 flex bg-white items-center justify-between text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Antonio Mendoza</p>

      <div className="flex gap-4">
        <button className="hover:text-black transition">
            <a href="https://github.com/amendoza09/pomodoro-technique"><FaGithub /> </a>
        </button>
        <button className="hover:text-black transition">
            <a href="https://new-personal-web.onrender.com/">Contact</a>
        </button>
      </div>
    </footer>
  );
};

export default Footer;