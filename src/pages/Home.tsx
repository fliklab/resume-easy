import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto h-screen">
      <div>
        <h1 className="text-2xl font-bold my-6">RESUME EASY</h1>
        <p className="text-gray-500 mb-6">이력서 작성을 위한 프로젝트입니다</p>
        <nav className="mb-6">
          <ul className="flex space-x-6">
            <li>
              <Link to="/sample" className="text-blue-500 hover:underline">
                샘플 이력서
              </Link>
            </li>
            <li>
              <Link to="/default" className="text-blue-500 hover:underline">
                기본 이력서
              </Link>
            </li>
            <li>
              <Link to="/test-blocks" className="text-blue-500 hover:underline">
                블록 테스트
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/fliklab/resume-easy"
                className="text-blue-500 hover:underline"
              >
                Github
              </Link>
            </li>
          </ul>
        </nav>
        <p></p>
      </div>
    </div>
  );
};

export default Home;
