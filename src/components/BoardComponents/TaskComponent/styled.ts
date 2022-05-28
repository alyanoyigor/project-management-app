import styled from 'styled-components';

export const Task = styled.li`
  position: relative;
  background-color: #ffffff;
  width: 100%;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 10px;
  padding-right: 36px;
  margin: 5px 0px;
  cursor: pointer;
  transition: 0.1s;
  box-shadow: 0 1px 0 #091e4240;
  white-space: normal;
  overflow: hidden;
  &:hover {
    background-color: #ffffff80;
  }
`;

export const DeleteBtn = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;

export const TaskButton = styled.div`
  max-width: 246px;
  height: 100%;
`;
