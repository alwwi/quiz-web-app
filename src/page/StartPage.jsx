const StartPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-gray-200 w-[70%] h-[70%] rounded-2xl flex flex-col text-center px-10 pt-30">
        <h3 className="text-2xl font-medium">
          <span className="text-red-500 text-3xl font-bold">Halo</span>, Selamat datang User di halaman kuiz. Siapkan dirimu untuk menguji
          pengetahuanmu dengan 20 soal seru. Semangat mengerjakan!
        </h3>
        <div className="flex justify-center mt-9">
          <a href="/#" className="bg-blue-500 text-white px-10 py-2 rounded-lg text-center justify-center text-lg font-semibold hover:bg-blue-600 transition duration-300">
            Mulai tes!
          </a>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
