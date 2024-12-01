import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Axios } from "../api/Api";

const Submit = () => {
  const [selected, setSelected] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { problemId } = useParams();

  const options = [
    { value: "c", label: "C언어" },
    { value: "c#", label: "C#" },
    { value: "c++", label: "C++" },
    { value: "go", label: "go" },
    { value: "java", label: "java" },
    { value: "javascript", label: "javascript" },
    { value: "kotlin", label: "kotlin" },
    { value: "python", label: "python" },
    { value: "php", label: "php" },
    { value: "r", label: "R" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      outline: "none",
      boxShadow: "none",
      borderColor: "gray",
      cursor: "pointer",
      "&:hover": { borderColor: "gray" },
    }),
    placeholder: (base) => ({
      ...base,
      color: "gray",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#f0f0f0" : "white",
      color: "black",
      cursor: "pointer",
    }),
  };

  const onChangeSelect = (e) => {
    if (e) setSelected(e.value);
    else setSelected("");
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selected || !code.trim()) {
      alert("언어와 코드를 모두 입력해주세요.");
      return;
    }

    if (!problemId || isNaN(Number(problemId))) {
      alert("유효한 문제 ID가 없습니다.");
      return;
    }

    const requestBody = {
      language: selected,
      code: code.trim(),
    };

    try {
      setLoading(true);
      const response = await Axios.post(
        `/problems/${Number(problemId)}`,
        requestBody
      );

      console.log("Response:", response.data);
      const { correct, id } = response.data.data;

      if (correct) {
        navigate(`/review/${Number(problemId)}`, { state: response.data.data });
      } else {
        navigate(`/fail/${Number(problemId)}`, { state: { solutionId: id } });
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      alert("코드 제출에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <LoadingOverlay>
          <LoadingContent>
            <Spinner />
            <LoadingText>제출 중입니다...</LoadingText>
          </LoadingContent>
        </LoadingOverlay>
      )}
      <Container>
        <CautionBox>
          <p>
            <span>! 주의사항</span>
            <br />
            C++ -&gt; int main()으로 작성해주세요 <br />
            JAVA -&gt; 클래스 이름을 반드시 Main으로 작성해주세요
          </p>
        </CautionBox>
        <InputBox>
          <TopBox>
            <p># {problemId || "문제 ID를 확인할 수 없습니다."}</p>
            <Select
              onChange={onChangeSelect}
              options={options}
              placeholder="언어 선택"
              styles={customStyles}
            />
          </TopBox>
          <CodeBox>
            <p>소스코드</p>
            <InputCodeBox>
              <InputCode
                placeholder="코드를 입력해주세요"
                value={code}
                onChange={handleCodeChange}
              />
            </InputCodeBox>
          </CodeBox>
        </InputBox>
        <BtnBox>
          <Button
            children="문제로"
            bgc={({ theme }) => theme.colors.beige2}
            onClick={() => navigate(`/problem/${problemId}`)}
          />
          <Button
            children="제출하기"
            onClick={handleSubmit}
            bgc={({ theme }) => theme.colors.deepPink}
            hoverColor={({ theme }) => theme.colors.pink}
            disabled={loading}
          />
        </BtnBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 90px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const CautionBox = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.beige2};
  border-radius: 15px;
  width: 100%;
  height: auto;
  padding: 20px;
  display: flex;
  align-items: center;
  line-height: 1.5em;
  margin-bottom: 60px;
  span {
    font-weight: 700;
  }
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    font-size: 20px;
    font-weight: 700;
  }
`;
const TopBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CodeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.beige2};
  width: 100%;
  min-height: 500px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  padding: 0 6px 6px;
  p {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    padding-left: 10px;
    height: 50px;
    display: flex;
    align-items: center;
  }
`;

const InputCodeBox = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 15px;
  padding: 15px;
  min-height: 450px;
`;

const InputCode = styled.textarea`
  width: 100%;
  min-height: 450px;
  outline: none;
  resize: none;
  font-size: 15px;
  line-height: 1.5em;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 10px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
`;

const Spinner = styled.div`
  border: 6px solid ${({ theme }) => theme.colors.gray};
  border-top: 6px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
`;

export default Submit;
