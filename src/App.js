import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Mycode from "./pages/Mycode";
import Mypage from "./pages/Mypage";
import Problem from "./pages/Problem";
import ProblemList from "./pages/ProblemList";
import Rank from "./pages/Rank";
import Review from "./pages/Review";
import Submit from "./pages/Submit";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Fail from "./pages/Fail";
import ProblemBook from "./pages/ProblemBook";
import { AuthProvider } from "./context/AuthContext";
import MycodeList from "./pages/MycodeList";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<Main />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/join" element={<Join />} />
          <Route path="/mycode/:solutionId" element={<Mycode />} />
          <Route path="/mypage/:userProfileId" element={<Mypage />} />
          <Route path="/problem/:problemId" element={<Problem />} />
          <Route path="/problemlist" element={<ProblemList />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/review/:problemId" element={<Review />} />
          <Route path="/fail/:problemId" element={<Fail />} />
          <Route path="/submit/:problemId" element={<Submit />} />
          <Route path="/book" element={<ProblemBook />} />
          <Route path="/mycodelist/:userProfileId" element={<MycodeList />} />
        </Routes>
        <ScrollToTop />
      </Layout>
    </AuthProvider>
  );
}

export default App;
