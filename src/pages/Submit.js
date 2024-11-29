import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Axios } from "../api/Api";

const Submit = () => {
  const [selected, setSelected] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { problemId } = useParams();

  const options = [
    { value: "python", label: "파이썬" },
    { value: "java", label: "자바" },
    { value: "c", label: "C언어" },
    { value: "c#", label: "C#" },
    { value: "c++", label: "C++" },
    { value: "kotlin", label: "코틀린" },
    { value: "javascript", label: "자바스크립트" },
    { value: "r", label: "R" },
    { value: "php", label: "php" },
    { value: "go", label: "go" },
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
      const response = await Axios.post(
        `/problems/${Number(problemId)}`,
        requestBody
      );
      console.log("Response:", response.data);

      const { correct, id } = response.data.data;

      if (correct) {
        navigate(`/review/${Number(problemId)}`, { state: response.data.data });
      } else {
        navigate(`/fail/${Number(problemId)}`, { state: { solutionId: id } }); // solutionId 전달
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      alert("코드 제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
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
          children="이전으로"
          bgc={({ theme }) => theme.colors.beige2}
          onClick={() => navigate(-1)}
        />
        <Button
          children="제출하기"
          onClick={handleSubmit}
          bgc={({ theme }) => theme.colors.deepPink}
          hoverColor={({ theme }) => theme.colors.pink}
        />
      </BtnBox>
    </Container>
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

export default Submit;
