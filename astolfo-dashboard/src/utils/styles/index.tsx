import styled, { css } from "styled-components";

export const MainButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 350px;
  align-items: center;
  justify-content: space-between;
  background-color: #2121218d;
  padding: 4px 50px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #58585863;
  margin: 10px 0;
  box-shadow: 0px 1px 8px 0px #00000018;
`;

export const TextButton = styled(MainButton)`
  padding: 10px 20px;
  width: 100%;
  background-color: #272727;
`;

export const HomePageStyle = styled.div`
  height: 100%;
  padding: 100px 0;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const GuildMenuItemStyle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: #252525;
  border-radius: 5px;
  border: 1px solid #ffffff2f;
  margin: 8px 0;
`;

export const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`;

export const AppBarStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 35px;
  box-sizing: border-box;
  border-bottom: 1px solid #c9c9c921;
`;

export const Title = styled.p`
  font-size: 22px;
`;

type FlexProps = Partial<{
  alignItems: string;
  justifyContent: string;
  flexDirection: string;
}>;
export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
`;

export const InputField = styled.input`
  padding: 14px 16px;
  font-size: 16px;
  color: #fff;
  box-sizing: border-box;
  font--family: "DM Sans";
  background-color: #272727;
  border-radius: 5px;
  border: 1px solid #3b3b3b;
  outline: none;
  width: 100%;
  :focus {
    outline: 1px solid #ffffff5a;
  }
`;

export const TextArea = styled.textarea`
  padding: 14px 16px;
  box-sizing: border-box;
  font-size: 16px;
  color: #fff;
  font--family: "DM Sans";
  background-color: #272727;
  border-radius: 5px;
  border: 1px solid #3b3b3b;
  outline: none;
  width: 100%;
  resize: none;
  :focus {
    outline: 1px solid #ffffff5a;
  }
`;

type ButtonProps = {
  variant: "primary" | "secondary";
};

export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border-radius: 5px;
  outline: none;
  border: none; 
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  font-family: 'DM Sans';
  ${({ variant }) =>
    variant === "primary" &&
    css`
      background-color: #006ed3;
    `}
  ${({ variant }) =>
    variant === "secondary" &&
    css`
      background-color: #3d3d3d;
    `}
}
`;

export const Page = styled.div`
  padding: 50px;
`;

export const Select = styled.select`
  cursor: pointer;
  padding: 10px;
  font-size: 18px
  font-family: "DM Sans";
  background-color: inherit;
  padding: 12px 16px;
  color: #fff;
  border: 1px solid #3f3f3f;
  border-radius: 5px;
  & > option {
    background-color: #292929;
  }
`;

export const OverLay = styled.div`
  height: 100%;
  width: 100%;
  background-color: #0000006c;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;
