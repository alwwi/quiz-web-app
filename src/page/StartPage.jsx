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
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-gray-200 w-[70%] h-[70%] rounded-2xl flex flex-col text-center px-10 pt-30">
        <h3 className="text-2xl font-medium">
          <span className="text-red-500 text-3xl font-bold">Halo {data.username}</span>, Selamat datang di halaman kuis. Siapkan dirimu untuk menguji
          pengetahuanmu dengan 20 soal seru. Semangat mengerjakan!
        </h3>
        <div className="flex justify-center mt-9">
          <a href="/soal" className="bg-blue-500 text-white px-10 py-2 rounded-lg text-center justify-center text-lg font-semibold hover:bg-blue-600 transition duration-300">
            Mulai tes!
          </a>
        </div>
      </div>
      <div className="absolute top-10 right-10">
        <a href="/" onClick={()=>localStorage.removeItem('currentUser')} className="bg-blue-500 text-white px-10 py-2 rounded-lg text-center justify-center text-lg font-semibold hover:bg-blue-600 transition duration-300">Keluar</a>
      </div>
    </div>
  );
};

export default StartPage;
