import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  padding: 30px;
  margin: 30px;
  margin-left: 0px;
  border-radius: 10px;
  width: 300px;

  @media (max-width: 768px) {
    width: 80%;
    margin: 20px 0px;
  }
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
  color: #1e293b;
`;

export const Info = styled.p`
  font-size: 18px;
  color: #94a3b8;
  padding: 10px 0px;
`;
