import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({username: 'Guest'});

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    const usersData = JSON.parse(localStorage.getItem('userData')) || [];
    const user = usersData.find(u => String(u.id) === currentUser);
    if (!currentUser) {
      alert('Login terlebih dahulu!');
      navigate('/');
      return
    }
    setData(user || {username: 'Guest'});
  }, [navigate]);


  return (
  <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-300 via-blue-400 to-blue-500 p-8">
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-12 flex flex-col items-center text-center">
      <h3 className="text-4xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
        <span className="text-gradient bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
          Halo {data.username}
        </span>
        , Selamat datang di halaman kuis!
      </h3>
      <p className="text-lg text-gray-700 max-w-xl mb-12">
        Siapkan dirimu untuk menguji pengetahuanmu dengan 20 soal seru. Semangat mengerjakan!
      </p>
      <a
        href="/soal"
        className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 via-orange-400 to-orange-500 text-white px-14 py-4 rounded-full font-semibold text-xl shadow-lg hover:scale-105 transform transition duration-300"
      >
        Mulai Tes!
      </a>
    </div>
    <a
      href="/"
      onClick={() => localStorage.removeItem('currentUser')}
      className="fixed top-10 right-10 bg-white bg-opacity-70 px-8 py-3 rounded-full font-semibold text-gray-900 shadow-md hover:scale-105 transform transition duration-300 hover:bg-gray-300"
    >
      Keluar
    </a>
  </div>
)
};

export default StartPage;
